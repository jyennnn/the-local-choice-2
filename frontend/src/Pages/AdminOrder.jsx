import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Notification from '../Components/Notification';
import { handleExpire } from '../utils/logoutUtils';

const AdminOrderStatus = () => {
    const actions = ["Edit", "Update", "Delete"];
    const token = localStorage.getItem('token');
    
    const [editingOrderNumber, setEditingOrderNumber] = useState("");
    const [orders, setOrders] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const navigate = useNavigate();

    const logout = (errorStatus) => {
        if (errorStatus === 401) {
            setOpenSnackbar(true);
            setSnackbarMessage("Please login or create an account to view this page! Redirecting in 3 seconds...");
            setSnackbarSeverity("error");
            handleExpire();
            setTimeout(() => {
                navigate("/login");
                window.location.reload();
            }, 3000);
        }
    }


    const getAllOrders = async () => {
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/orders`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            setOrders(response.data.orders);
            setOpenSnackbar(true);
            setSnackbarMessage("Orders retrieved successfully!");
            setSnackbarSeverity("success");
        })
        .catch((error) => {
            console.log(error);
            logout(error.response.status);
        });
    }

    const updateOrderStatus = async (orderId, status) => {
        await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/orders/${orderId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                status: status
            }
        })
        .then((response) => {
            console.log(response);
            setOpenSnackbar(true);
            setSnackbarMessage("Order status updated successfully!");
            setSnackbarSeverity("success");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            // getAllOrders();
        })
        .catch((error) => {
            console.log(error);
            logout(error.response.status);
        });
    }

    const deleteOrder = async (orderId) => {
        await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/orders/${orderId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            setOpenSnackbar(true);
            setSnackbarMessage("Order deleted successfully!");
            setSnackbarSeverity("success");
            getAllOrders();
        })
        .catch((error) => {
            console.log(error);
            logout(error.response.status);
        });
    }


    useEffect(() => {
        getAllOrders();
    }, []);


    const handleStatusChange = (event, orderId) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderId === orderId ? { ...order, status: event.target.value } : order
            )
        );
    };

    // handle update button which post request to backend to update status !!!

    const handleEdit = (orderId) => {
        console.log("Editing order " + editingOrderNumber)
        if (editingOrderNumber === orderId) {
            setEditingOrderNumber("");  // disable editing for this order if it's currently being edited
        } else {
            setEditingOrderNumber(orderId);  // enable editing for this order
        }
    };

    const handleUpdate = (_id , orderId) => {
        console.log("Updating order " + orderId)
        console.log("Updating order " + _id)
        const orderToUpdate = orders.find(order => order._id === _id);
        updateOrderStatus(orderToUpdate._id, orderToUpdate.status);
        setEditingOrderNumber("");  // disable editing after updating 
    }

    const handleDelete = (_id) => {
        console.log("Deleting order " + _id)
        const orderToDelete = orders.find(order => order._id === _id);
        deleteOrder(orderToDelete._id);
    }

    return (
        <div style={{ flexGrow: "1", display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>

            <TableContainer component={Paper} sx={{
                marginTop: "20px",
                backgroundColor: "#EFEAE0",
                borderRadius: "10px",
                alignItems: "center",
                margin: "30px auto",
                width: "80%",
            }}>
                <Table>
                    <TableHead sx={{
                        width: "100%",
                        margin: "auto",
                    }}>
                        <TableRow sx={{ width: "100%", margin: "auto" }}>
                            <TableCell sx={{ fontWeight: "600" }}>Order Number</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "600" }}>Date</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "600" }}>Total Amount</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "600" }}>Total Items</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "600" }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "600" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell align="right">{order.createdAt.slice(0, 10)}</TableCell>
                                <TableCell align="right">{order.totalPrice.toFixed(2)}</TableCell>
                                <TableCell align="right">{order.orderItems.map(item => item.qty).reduce((a, b) => a + b, 0)}</TableCell>
                                <TableCell align="right">
                                    <Select
                                        disabled={editingOrderNumber !== order.orderId}
                                        value={order.status}
                                        onChange={(event) => handleStatusChange(event, order.orderId)}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Processing">Processing</MenuItem>
                                        <MenuItem value="Shipped">Shipped</MenuItem>
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="right">
                                    {actions.map(action => (
                                        <Button key={action}
                                            onClick={action === "Edit" ? () => handleEdit(order.orderId) : 
                                                action === "Update" ? () => handleUpdate(order._id, order.orderId) :
                                                action === "Delete" ? () => handleDelete(order._id) :
                                                () => console.log("Unknown action " + action)}
                                            variant="contained" color="primary" size="small" style={{ marginRight: "8px" }}>
                                            {action}
                                        </Button>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminOrderStatus;
