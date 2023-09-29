import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Typography } from "@mui/material";
import RouteHistory from "../Components/RouteHistory";

// cart context
// import { CartContext } from "../CardContext";
import { useGetStoreByIdQuery } from "../Slices/storeSlice";
import { addToCart } from "../Slices/cartSlice";
import { useDispatch } from "react-redux";
import Notification from "../Components/Notification";
import { handleExpire } from "../utils/logoutUtils";
import Loading from "../Components/Loading";

const ProductDetail = () => {

  // fetch data by storeId
  const { id, productId } = useParams();
  const token = localStorage.getItem("token");
  const {data: currentStore, isLoading, error} = useGetStoreByIdQuery({ storeId: id, token });
  
  const [currentProduct, setCurrentProduct] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // render store after data fetched 
  useEffect(() => {
    if (!isLoading) {
      setCurrentProduct(
        currentStore?.store?.products.find((product) => product._id === productId)
      );
    }
  }, [currentStore, isLoading]);


  // // cart context
  // const cart = useContext(CartContext);
  // const productQuantity = cart.getProductQty(currentProduct._id);

  const [quantity, setQuantity] = useState(1);
  const storeId = currentStore?.store?._id;

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...currentProduct, quantity, storeId }));
  };

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

  if (!currentProduct) {
    // Handle the case where the product is not found
    return (
      <Container maxWidth="xs">
        <Typography
          variant="h4"
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center ",
            fontFamily: "Poppins",
            fontWeight: 300,
            color: "#414B3B",
            textDecoration: "none",
            margin: "150px 0px 0px 0px",
          }}
        >
          Product not found
        </Typography>
        <Button
          onClick={() => navigate("/products")}
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#99958C",
            color: "#E4DCCD",
            width: "20ch",
            margin: "50px 0px 0px 110px",
            "&:hover": {
              backgroundColor: "#737373",
            },
          }}
        >
          Go back to products
        </Button>
      </Container>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading bgColor="primary.light" />
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
          <RouteHistory
            page={`stores/${currentStore.store.name}`}
            routeName={`stores/${id}/${productId}`}
          />
          <Container
            style={{
              minWidth: "480px",
              height: "95vh",
              overflowY: "auto",
              overflowX: "hidden",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={{ s: 12, md: 2 }}
              sx={{ justifyContent: "center", overflowX: "clip" }}
            >
              <Grid item xs={12} md={6} key={id}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  style={{ width: "80%", margin: "30px 30px" }}
                />
              </Grid>
              <Grid
                spacing={{ s: 12, md: 6 }}
                sx={{ justifyContent: "center" }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    fontFamily: "Poppins",
                    fontWeight: 300,
                    color: "#414B3B",
                    textDecoration: "none",
                    margin: "50px 0px 0px 0px",
                  }}
                >
                  {currentProduct.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    fontFamily: "Poppins",
                    fontWeight: 200,
                    color: "#414B3B",
                    textDecoration: "none",
                    margin: "20px 0px 30px 0px",
                  }}
                >
                  {currentProduct && currentProduct.price
                    ? "$" + currentProduct.price.toFixed(2)
                    : "0.00"}
                </Typography>

                <div>
                  <FormControl fullWidth>
                    <InputLabel id="quantity-label">Quantity</InputLabel>
                    <Select
                      labelId="quantity-label"
                      id="quantity-select"
                      value={quantity}
                      onChange={handleQuantityChange} // Update the quantity when selection changes
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
              </Grid>
            </Grid>
            <Grid spacing={{ s: 12, md: 6 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  color: "#414B3B",
                  textDecoration: "none",
                  margin: "50px",
                  textOverflow: "clip",
                }}
              >
                description
              </Typography>
            </Grid>
            <Grid spacing={{ s: 12, md: 6, overflowX: "clip" }}>
              <Typography
                variant="h7"
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontFamily: "Poppins",
                  fontWeight: 200,
                  color: "#414B3B",
                  textDecoration: "none",
                  margin: "50px",
                  textAlign: "left",
                }}
              >
                {currentProduct.description}
              </Typography>
              <br />
              <br />
            </Grid>

            {/* reviews */}
            {/* <Grid item sm={8}>
            <Divider variant="middle" />
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              justifyContent: "left",
              fontFamily: "Poppins",
              fontWeight: 400,
              color: "#414B3B",
              textDecoration: "none",
              margin: "50px",
            }}
          >
            customer reviews <Rating value={currentProduct.reviewRating} />
          </Typography>
        </Grid>
        <Grid item sm={8}>
          <Typography
            variant="h7"
            sx={{
              display: "flex",
              justifyContent: "left",
              fontFamily: "Poppins",
              fontWeight: 200,
              color: "#414B3B",
              textDecoration: "none",
              margin: "50px",
              textAlign: "left",
            }}
          >
            (reviewSchema) Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Incidunt velit deserunt, aliquam maiores nesciunt rem quasi
            iusto eaque! Ad libero deserunt fugit quidem, ullam quae repellendus
            consequatur quam? Rem, consequuntur!
          </Typography>
        </Grid> */}
          </Container>
        </>
      )}
    </>
  );
};

export default ProductDetail;
