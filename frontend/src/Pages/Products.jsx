/// not using
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import RouteHistory from "../Components/RouteHistory";
import store from "../store";
import products from "../products";

const Products = () => {
  const displayProduct = store[0].products.map((item) => {
    return (
      <Card
        key={item._id}
        sx={{
          minWidth: 345,
          margin: "30px 15px",
          borderRadius: "10px",
          backgroundColor: "#EFEAE0",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={item.image}
          alt={item.name}
          sx={{
            objectFit: "contain",
            width: "90%",
            margin: "0 auto",
          }}
        />
        <CardContent>
          <Link key={item._id} to={`/products/${item._id}`}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#75695A",
                textDecoration: "none",
                margin: "0px",
              }}
            >
              {item.name}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    );
  });

  return (
    <>
      <RouteHistory page="products" routeName="products" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {displayProduct}
        </div>
      </div>
    </>
  );
};

export default Products;
