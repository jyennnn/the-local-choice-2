import axios from "axios";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RouteHistory from "../Components/RouteHistory";
import Notification from "../Components/Notification";

const SignUp = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const postUser = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: form,
    })
      .then(function (response) {
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setSnackbarMessage("User created successfully");
        console.log(response);
        if (response.status === 201) {
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setSnackbarMessage("User created successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setSnackbarMessage("User creation failed");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const newForm = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    setForm(newForm); // Updating the form state
    // postUser();        // Sending the form data to the server
  };

  useEffect(() => {
    if (
      form.firstName !== "" &&
      form.lastName !== "" &&
      form.email !== "" &&
      form.password !== ""
    ) {
      postUser();
      // navigate('/login');
    }
  }, [form]);

  return (
    <div style={{ height: "90vh", overflowY: "clip" }}>
      <RouteHistory page="create account" routeName="signup" />

      <Box
        component="form"
        onSubmit={handleSubmit} // Binding the handleSubmit function
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
              letterSpacing: "0rem",
              color: "#414B3B",
              textDecoration: "none",
              margin: "20px 0px",
              fontSize: "26px",
              textAlign: "center",
            }}
          >
            Create Account
          </Typography>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            color="secondary"
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            color="secondary"
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            color="secondary"
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            required
            type="password"
            id="password"
            name="password"
            label="Password"
            color="secondary"
            defaultValue=""
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#99958C",
            color: "#E4DCCD",
            width: "45ch",
            marginTop: "40px",
            "&:hover": {
              backgroundColor: "#737373",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Notification
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        vertical="bottom"
        horizontal="right"
      />
    </div>
  );
};

export default SignUp;
