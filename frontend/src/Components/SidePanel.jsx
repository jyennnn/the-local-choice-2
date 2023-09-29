import { Container, Grid, Box, Hidden } from "@mui/material"
import Stack from '@mui/system/Stack';
import RouteHistory from "../Components/RouteHistory";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Notification from "./Notification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SidePanel = (props) => {
    const userData = localStorage.getItem("user");
    const name = JSON.parse(userData).firstName;
    const navigate = useNavigate();
    // notification
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    let pages = ["stores", "about", "contact"];
    let settings = ["profile", "orders", "login", "logout"];

    if (localStorage.getItem("role") === "admin") {
      settings = [ "logout"];
      pages = ["config"];
    } 
    else if (localStorage.getItem("role") === "user") {
      settings = ["profile", "orders", "logout"];
      pages = ["home","stores", "about", "contact"];
    }
    else {
      settings = ["login", "logout"];
      pages =[];
    }

    const handleLogoutClick = () => {
        postLogout();
    };
      // handle close snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    const postLogout = async () => {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/logout`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log("Logged out successfully");
              setSnackbarSeverity("success");
              setOpenSnackbar(true);
              setSnackbarMessage("Logged out successfully");
              setTimeout(() => {
                handleLogout();
              }, 2000);
            }
          })
          .catch((error) => {
            console.log(error);
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            setSnackbarMessage("Logout failed");
        });
    }
    const buttonStyle ={
        backgroundColor:"#75695a",
        color:"#e4dccd",
        boxShadow: "none",
        minWidth: "200px",
        minHeight: "50px",
        '&:hover': {
            backgroundColor: '#e4dccd',
            color:"#75695a",
            opacity: [0.9, 0.8, 0.7],
        }
    }

    return ( 
        <Grid item xs={3} >
                <RouteHistory page={props.page} routeName={props.route}/>
                <Stack 
                    direction={{ xs: 'column'}}
                    spacing={{ xs: 2}}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <h3>Hi, {name}</h3>
                    <Button 
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon />}
                        href="/orders"
                        sx ={buttonStyle}>
                    Orders
                    </Button>
                    <Button 
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon />}
                        href="/profile"
                        sx ={buttonStyle}>
                    Personal Data
                    </Button>
                    <Button 
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={handleLogoutClick}
                        sx ={buttonStyle}>
                    Sign Out
                    </Button>
                </Stack>
                <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>
        </Grid>
     );
}
 
export default SidePanel;