import RouteHistory from "../Components/RouteHistory";
import { Typography, Box } from "@mui/material";

const About = () => {
  return (
    <>
      <Box style={{ height: "89vh", overflowY: "hidden" }}>
        <RouteHistory page="about" routeName="about" />
        <div
          style={{
            minHeight: "83vh",
            maxWidth: "60%",
            margin: "0 auto",
            justifyContent: "center",
            overflowY: "hidden",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "#75695A",
              margin: "20px 0",
              fontSize: "26px",
            }}
          >
            About
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
            <b>THE LOCAL CHOICE</b> is a Singapore-based online pop-up market
            showcasing homegrown brands.
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: "#75695A",
              margin: "20px 0",
              fontSize: "15px",
            }}
          >
            Our goal is to provide a platform to connect and bring awareness to
            our vibrant local small businesses. With the support from our local
            community, we hope it will inspire more individuals to plant their
            seed and grow their ideas.
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default About;
