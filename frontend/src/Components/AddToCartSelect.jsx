import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import store from "../store";
import CardContext, { CartContext } from "../CardContext";

const AddToCart = ({ productId, onAddToCart }) => {
  const { id } = useParams();
  const product = store[0].products.find((item) => item._id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    // Find the selected product in the products array
    const selectedProduct = store[0].products.find(
      (item) => item._id === parseInt(id)
    );

    // Check if the product exists and the selected quantity is valid
    if (
      selectedProduct &&
      quantity > 0 &&
      quantity <= selectedProduct.quantity
    ) {
      // Perform the "Add to Cart" action here or pass the selected product and quantity
      // to a function like onAddToCart for further processing
      onAddToCart(selectedProduct, quantity);
    } else {
      // Handle cases where the product is not found or quantity is invalid
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="quantity-label">Quantity</InputLabel>
        <Select
          labelId="quantity-label"
          id="quantity-select"
          value={quantity}
          label="Quantity"
          onChange={handleQuantityChange}
          sx={{ maxWidth: "100px", backgroundColor: "#F8F5ED" }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        sx={{
          display: "flex",
          backgroundColor: "#99958C",
          color: "#E4DCCD",
          width: "20ch",
          textAlign: "center",
          margin: "30px 0px 0px 0px",
          padding: "20px",
          "&:hover": {
            backgroundColor: "#737373",
          },
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
