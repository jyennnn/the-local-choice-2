import RouteHistory from "../Components/RouteHistory";
import { Typography, Container } from "@mui/material";

const Contact = () => {
  return (
    <>
      <div style={{ height: "89vh", overflowY: "hidden" }}>
        <RouteHistory page="contact" routeName="contact" />
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
            Contact
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "#75695A",
              fontSize: "15px",
            }}
          >
            For enquiries and collaborations, drop us an email at{" "}
            <u>hi@thelocalchoice.com</u>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Contact;
