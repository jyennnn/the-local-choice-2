import PayButton from "../Components/PayButton";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { useCreateOrderMutation } from "../Slices/orderSlice";
import RouteHistory from "../Components/RouteHistory";
import { CartContext } from "../CardContext";
import CartProduct from "../Components/CartProduct";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Checkout = () => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const orderItems = cart.items.map((item) => item);

  const { cartItems } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);

  return (
    <Box
      sx={{
        backgroundColor: "#e4dccd",
        flexGrow: "1",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#e4dccd",
          marginTop: "10px",
          marginBottom: "10px",
          flexGrow: "1",
        }}
      >
        <RouteHistory page="checkout" routeName="checkout" />
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
          Your Cart
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "20px",
            backgroundColor: "#EFEAE0",
            borderRadius: "10px",
            alignItems: "center",
            margin: "30px auto",
            width: "90%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((product, idx) => (
                <CartProduct key={idx} {...product} />
              ))}
            </TableBody>
          </Table>
          <Typography
            marginBottom="1em"
            sx={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}
          >
            Total Price: ${totalPrice}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}
          >
            <PayButton cartItems={orderItems} />
          </Box>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Checkout;
