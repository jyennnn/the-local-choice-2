import { Grid, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetStoresQuery } from "../Slices/storeSlice";
import WindowAnimation from "../Components/WindowAnimation";
import { handleExpire } from "../utils/logoutUtils";
import { useState, useEffect } from "react";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import RouteHistory from "../Components/RouteHistory";

const AllStores = () => {

  const navigate = useNavigate();

  // fetch stores data
  const token = localStorage.getItem("token");
  const { data: stores, isLoading, error } = useGetStoresQuery(token);

  // states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // errors
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

  return (
    <div style={{ minWidth: "400px", height: "89vh", overflowY: "auto" }}>
      <RouteHistory page="store" routeName="store" />

      <Container>
        <Typography
          sx={{
            inHeight: "100vh",
            minWidth: "60%",
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#75695A",
            margin: "20px 0",
            fontSize: "26px",
            overflowY: "hidden",
          }}
        >
          Stores
        </Typography>
      </Container>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={0}
          sx={{
            bgcolor: "#aca599",
          }}
        >
          <Grid item md={12}></Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          sx={{
            justifyContent: "center",
            paddingLeft: "8%",
            paddingRight: "8%",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        >
          {isLoading ? (
            <Loading bgColor="primary.dark" />
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
            <>
              {stores.stores.map((store) => {
                return (
                  <>
                    <WindowAnimation store={store} />
                  </>
                );
              })}
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default AllStores;
