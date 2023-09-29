import {useState, useEffect, useParams} from "react";
import axios from "axios";
// import store from "../store"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { handleExpire } from "../utils/logoutUtils";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";


const Admin = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState([]);
    const token = localStorage.getItem('token');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

    const getStores = async () => {
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/config/stores`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            setStore(response.data.stores);
            setOpenSnackbar(true);
            setSnackbarMessage("Stores retrieved successfully!");
            setSnackbarSeverity("success");
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                setOpenSnackbar(true);
                setSnackbarMessage("Please login or create an account to view this page! Redirecting in 3 seconds...");
                setSnackbarSeverity("error");
                handleExpire();
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }
                , 3000);
            }
        });
    }

    const handleDelete = (storeId) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            deleteStore(storeId);
        }
    }

    const deleteStore = async (storeId) => {
        await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/config/stores/${storeId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            getStores();
            setOpenSnackbar(true);
            setSnackbarMessage("Store deleted successfully!");
            setSnackbarSeverity("success");
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                setOpenSnackbar(true);
                setSnackbarMessage("Please login or create an account to view this page! Redirecting in 3 seconds...");
                setSnackbarSeverity("error");
                handleExpire();
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }
                , 3000);
            }
        });
    }

    useEffect(() => {
        getStores();
    }, []);

    const actionStyle = {
        display: "flex",
        fontFamily: 'Poppins',
        fontWeight: 500,
        color: '#414B3B',
        textDecoration: 'underline', 
        fontSize:'16px',
        textAlign:'center',
        margin:'0px 20px',
        "&:hover": {
            color: "#737373",
            cursor: "pointer",
        }
    }

    const buttonStyle = {
        backgroundColor:"#99958C",
        color:"#E4DCCD",
        width:"40%",
        margin:"10px auto",
        '&:hover': {
            backgroundColor: "#737373"
        }
    }

    const displayStore = store.map((item) => {
        return (
            <Card key={item.id} 
                    sx={{ 
                        maxWidth: 250, 
                        height: 250, 
                        justifyContent: 'center', 
                        margin: "30px 15px", 
                        borderRadius:"10px", 
                        backgroundColor:"#EFEAE0",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                        objectFit: "contain",
                        width: "90%",
                        margin: "0 auto",
                        padding: "10px"
                    }}
                />
                <CardContent>
                    <Typography gutterBottom component="div"
                    sx ={{
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: '500',
                        margin: "-10px 0px",
                        padding: '5px',
                        color: 'primary.contrastText'
                    }}>
                        {item.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent:"center"}}>
                    <Link key={item._id} to={`/config/stores/${item._id}`}>
                        <Typography gutterBottom component="div"
                        sx ={actionStyle}
                        >
                            edit
                        </Typography>
                    </Link>
                    <Typography gutterBottom component="div"
                    noWrap
                    onClick={() => handleDelete(item._id)}
                    sx={actionStyle}>
                        delete
                    </Typography>
                </CardActions>
            </Card>
        )
    })
    
    return ( 
        <div style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width:"100%" }}>
                {store.length > 0 ? displayStore : 
                <Typography variant="h6" component="div"
                sx ={{
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontSize:"20px",
                    margin:"30px 0px",
                }}>
                    <Loading bgColor="primary.light" />
                </Typography>}
            </div>
            <Button variant="contained" 
            sx={buttonStyle}
                href = "/config/stores/new"
                >
                Add New Store
            </Button>
            <Button variant="contained"
            sx={buttonStyle}
                href = "/config/stores/orders"
                >
                Manage Order Status
            </Button>
            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>
        </div>
     );
}

export default Admin;

 