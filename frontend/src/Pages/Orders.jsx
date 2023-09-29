import { Grid } from "@mui/material";
import Stack from "@mui/system/Stack";
import SidePanel from "../Components/SidePanel";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleExpire } from "../utils/logoutUtils";
import { useState } from "react";
import { useGetMyOrderQuery } from "../Slices/orderSlice";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setOrderId, setOrderData } from "../Slices/orderDataSlice";

const Orders = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const userId = JSON.parse(userData).id;
  // const [orders, setOrders] = useState([]);
  const {
    data: myOrders,
    error,
    isLoading,
  } = useGetMyOrderQuery({ userId: userId, token });
  console.log("myOrders", myOrders);

  const orderId = useSelector((state) => state.orderData.orderId);
  const orderData = useSelector((state) => state.orderData.orderData);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [rows, setRows] = useState([]);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (error?.status === 401) {
      console.log("401 error");
      setOpenSnackbar(true);
      setSnackbarMessage(
        "Please login or create an account to view this page!"
      );
      setSnackbarSeverity("error");
      handleExpire();
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (myOrders) {
      console.log("myOrders", myOrders);

      const updatedRows = myOrders.orders.map((order) => ({
        id: order.orderId,
        date: new Date(order.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
        status: order.status,
        total: order.totalPrice,
      }));

      setRows(updatedRows);
    }
  }, [myOrders]);

  const columns = [
    {
      field: "id",
      headerName: "Order No.",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 150,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        if (typeof params.value === "number") {
          return `$${params.value.toFixed(2)}`; // Add a dollar sign and format with 2 decimal places
        }
        return params.value;
      },
    },
    {
      field: "view",
      headerName: "",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <button onClick={() => viewOrder(params.row.id)}>View</button>;
      },
    },
  ];

  // const rows = [
  //   { id: 1, date: '20 Sep 2023', status: 'processing', total: 35},
  //   { id: 2, date: '10 Sep 2023', status: 'shipped', total: 42 },
  //   { id: 3, date: '18 Sep 2023', status: 'completed', total: 45 },
  //   { id: 4, date: '16 Aug 2023', status: 'completed', total: 16 },
  //   { id: 5, date: '12 Jun 2023', status: 'completed', total: 110 },
  //   { id: 6, date: '19 May 2023', status: 'completed', total: 150 },
  //   { id: 7, date: '21 Mar 2023', status: 'completed', total: 44 },
  //   { id: 8, date: '23 Mar 2022', status: 'completed', total: 36 },
  //   { id: 9, date: '1 Mar 2022', status: 'completed', total: 65 },
  // ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);

    const currentOrder = myOrders.orders.find(
      (order) => order.orderId === orderId
    );
    const mongoOrderId = currentOrder._id;
    dispatch(setOrderId(mongoOrderId));
    dispatch(setOrderData(currentOrder));
  };

  return (
    <>
      {isLoading ? (
        <Loading bgColor="primary.light" />
      ) : error ? (
        <Notification
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
          vertical="bottom"
          horizontal="right"
        />
      ) : (
        <Grid
          container
          spacing={0}
          // style={{ minHeight: "80vh", margin: "10px auto" }}
        >
          <SidePanel page={"orders"} route={"orders"} />
          <Grid
            item
            xs={8.5}
            sx={{
              // backgroundColor: "black",
              borderRadius: "15px",
              margin: "20px auto",
              flexGrow: "1",
              minHeight: "100vh",
            }}
          >
            <Stack
              direction={{ xs: "column" }}
              spacing={{ xs: 4 }}
              alignItems={"center"}
              marginTop={2}
              // marginRight={5}
              // paddingTop={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F8F5ED",
                width: "95%",
                minHeight: "70vh",
                borderRadius: "10px",
              }}
              justifyContent={"flex-start"}
            >
              <h3 style={{ fontWeight: 500, fontSize: "20px" }}>Your Orders</h3>
              <div style={{ width: "70%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 6 },
                    },
                  }}
                  pageSizeOptions={[6, 11]}
                />
              </div>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Orders;