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

const Cancel = () => {
  const navigate = useNavigate(); // Define the navigate function
  return (
    <>
      {" "}
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
          Sad to see you go!
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
          Come back soon!
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
            Psst! you can still shop here!
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Cancel;
