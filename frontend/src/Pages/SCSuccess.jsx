import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import RouteHistory from "../Components/RouteHistory";
import axios from "axios";
import Notification from "../Components/Notification";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { clearCart } from "../Slices/cartSlice";
import { useDispatch } from "react-redux";

const Success = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Define the navigate function
  const { session_id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const dispatch = useDispatch();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const createOrder = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/scsuccess/${session_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("Created successfully");
          setOrderData(response.data.order);
          setOpenSnackbar(true);
          setSnackbarMessage(
            "Order created successfully! Redirecting to home page..."
          );
          setSnackbarSeverity("success");
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenSnackbar(true);
        setSnackbarMessage("Error creating order!");
        setSnackbarSeverity("error");
      });
  };
  useEffect(() => {
    // Call the function if session_id exists
    console.log(session_id);
    dispatch(clearCart());
    if (session_id) {
      createOrder();
    }
  }, []);
  return (
    <>
      <RouteHistory page="orders" routeName="orders" />
      <div
        style={{
          minHeight: "90vh",
          width: "60%",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#414B3B",
            marginTop: "100px",
            fontSize: "20px",
          }}
        >
          Payment Success!
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: 400,
            color: "#414B3B",
            marginTop: "15px",
            fontSize: "15px",
          }}
        >
          Thank you for your purchase you awesome person!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#99958C",
              color: "#E4DCCD",
              width: "280px",
              marginTop: "30px",
              "&:hover": {
                backgroundColor: "#737373",
              },
            }}
          >
            shop for more!
          </Button>
          <Notification
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            snackbarMessage={snackbarMessage}
            snackbarSeverity={snackbarSeverity}
            vertical="bottom"
            horizontal="right"
          />
        </Box>
      </div>
    </>
  );
};

export default Success;
