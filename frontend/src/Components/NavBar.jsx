// import * as React from 'react';
import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

import { Button, Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "./Logo";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { CartContext } from "../CardContext";
import CartProduct from "./CartProduct";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

import { useEffect } from "react";

import { useSelector } from "react-redux";
import Store from "@mui/icons-material/Store";

import { usePrefetch } from "../Slices/apiSlice";
import { useGetStoresQuery } from "../Slices/storeSlice";

var pages = ["home", "stores", "about", "contact"];
var settings = ["profile", "orders", "login", "logout"];
const obj = {
  profile: (
    <EmojiPeopleIcon
      sx={{ marginRight: "10px", width: "15px", color: "gray" }}
    />
  ),
  orders: (
    <ContentPasteIcon
      sx={{ marginRight: "10px", width: "15px", color: "gray" }}
    />
  ),
  login: (
    <LoginIcon sx={{ marginRight: "16px", width: "15px", color: "gray" }} />
  ),

  home: <HomeIcon sx={{ marginRight: "16px", width: "15px", color: "gray" }} />,
  stores: (
    <StoreIcon sx={{ marginRight: "16px", width: "15px", color: "gray" }} />
  ),
  about: (
    <InfoIcon sx={{ marginRight: "16px", width: "15px", color: "gray" }} />
  ),
  contact: (
    <ConnectWithoutContactIcon
      sx={{ marginRight: "16px", width: "15px", color: "gray" }}
    />
  ),
};

const stores = ["handfully", "handxmade"];

// Shopping cart Modal style
const styleModal = {
  anchorOrigin: "top",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "415px",
  maxHeight: "50vh", // set this to a desired maximum height, 90vh is 90% of the viewport height
  overflowX: "hidden", // content will scroll if it overflows
  bgcolor: "#F3EFE7",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const isMobile = window.matchMedia("(max-width: 480px)").matches;
if (isMobile) {
  styleModal.width = "50%"; // Adjust width for mobile screens
  styleModal.maxHeight = "70vh"; // You can adjust this value as needed
  styleModal.left = "0"; // Center on smaller screens
  styleModal.overflowX = "auto";
  styleModal.transform = "none"; // Remove the transform on smaller screens
}

function NavBar() {
  // notification
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const prefetchStores = usePrefetch('getStores')
  const token = localStorage.getItem('token');

  const prefetchData = () => {
    prefetchStores(token);
  }

  if (localStorage.getItem("role") === "admin") {
    settings = ["logout"];
    pages = ["config"];
  } else if (localStorage.getItem("role") === "user") {
    settings = ["profile", "orders", "logout"];
    pages = ["home", "stores", "about", "contact"];
  } else {
    settings = ["login", "logout"];
    pages = [];
  }

  // handle close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Shopping cart Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    postLogout();
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  // Shopping cart Modal Badge
  const { cartItems } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart); // total price of all items in cart
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // const cart = useContext(CartContext);
  // const productsCount = cart.items.reduce(
  //   (sum, product) => sum + product.quantity,
  //   0
  // );

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
  };

  // Go to Checkout - on Click

  const goToCartPage = () => {
    navigate(`/checkout`);
    setOpenModal(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#F3EFE7",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {/* Hamburger Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#414B3B"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{
                mt: "-10px",
                ml: "15px",
                "& .MuiPaper-root": {
                  backgroundColor: "#EFE9DD",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) =>
                page === "config" ? (
                  <Link
                    to={`/${page}/stores`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        width: "100px",
                        justifyContent: "center",
                        color: "gray",
                      }}
                    >
                      {obj[settings]}
                      <Typography
                        sx={{
                          color: "#414B3B",
                          fontSize: "14px",
                          fontFamily: "ovo",
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <Link to={`/${page}`} style={{ textDecoration: "none" }}>
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ width: "100px", justifyContent: "left" }}
                    >
                      {obj[page]}
                      <Typography
                        sx={{
                          color: "#414B3B",
                          fontSize: "14px",
                          fontFamily: "ovo",
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  </Link>
                )
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, idx) =>
              page === "config" ? (
                <Link to={`/${page}/stores`} style={{ textDecoration: "none" }}>
                  <Typography
                    key={idx}
                    variant="h7"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 400,
                      color: "#414B3B",
                      textDecoration: "none",
                      margin: "20px",
                    }}
                  >
                    {page}
                  </Typography>
                </Link>
              ) : (
                <Link to={`/${page}`} 
                    onMouseEnter={prefetchData}
                    style={{ textDecoration: "none" }}>
                  <Typography
                    key={idx}
                    variant="h7"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 400,
                      color: "#414B3B",
                      textDecoration: "none",
                      margin: "20px",
                    }}
                  >
                    {page}
                  </Typography>
                </Link>
              )
            )}

            {/* {page} */}
            {/* {page === "stores" ? (
                    <span style={{ display: "flex" }}>
                      {page}
                      <ArrowDropDownIcon
                        sx={{ margin: "3px 0px", fontSize: "15px" }}
                      />
                    </span>
                  ) : (
                    `${page}`
                  )}
                </Typography>
              </Link>
              ) */}
          </Box>

          {/* profile + cart*/}
          <Box sx={{ flexGrow: 0, margin: "0px 30px" }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonOutlineIcon sx={{ margin: "20px" }} />
              </IconButton>
              {/* Shopping cart */}
              <Badge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={totalQty}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#D9CDCE",
                    backgroundColor: "#414B3B",
                    margin: "20px",
                  },
                }}
              >
                <IconButton>
                  <ShoppingBagOutlinedIcon
                    onClick={handleOpenModal}
                    sx={{ margin: "10px" }}
                  />

                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={styleModal}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        fontFamily="Poppins"
                        fontWeight="400"
                        color="#414B3B"
                      >
                        your shopping cart
                      </Typography>

                      <Container>
                        <Typography
                          id="modal-modal-description"
                          sx={{
                            mt: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          variant="h7"
                          fontFamily="Poppins"
                          fontWeight="200"
                          color="#414B3B"
                        >
                          <br />
                          {cartItems.length > 0 ? (
                            <>
                              {/* <p>items in your cart</p> */}
                              {cartItems.map((currentProduct, idx) => (
                                <CartProduct
                                  key={idx}
                                  name={currentProduct.name}
                                  _id={currentProduct._id}
                                  quantity={currentProduct.quantity}
                                  price={currentProduct.price}
                                  image={currentProduct.image}
                                ></CartProduct>
                              ))}
                              {/* <h4>total: $ {cart.getTotalCost().toFixed(2)}</h4> */}
                              <br />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={goToCartPage}
                                sx={{
                                  display: "flex",
                                  backgroundColor: "#99958C",
                                  color: "#E4DCCD",
                                  width: "20ch",
                                  textAlign: "center",
                                  margin: "10px auto",
                                  padding: "18px",
                                  "&:hover": {
                                    backgroundColor: "#737373",
                                  },
                                }}
                              >
                                checkout ${totalPrice}
                              </Button>
                            </>
                          ) : (
                            <h4> add our awesome items to your cart!</h4>
                          )}
                        </Typography>
                      </Container>
                    </Box>
                  </Modal>
                </IconButton>
              </Badge>
            </Tooltip>
            {/* profile menu */}
            <Menu
              sx={{
                mt: "50px",
                ml: "-20px",
                "& .MuiPaper-root": {
                  backgroundColor: "#EFE9DD",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting === "logout" ? (
                  <>
                    <Divider />
                    <MenuItem
                      key={setting}
                      onClick={handleLogoutClick}
                      sx={{
                        width: "100px",
                        justifyContent: "center",
                        color: "gray",
                      }}
                    >
                      <LogoutIcon sx={{ marginRight: "10px", width: "15px" }} />
                      <Typography
                        sx={{
                          color: "#414B3B",
                          fontSize: "14px",
                          fontFamily: "ovo",
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  <Link to={`/${setting}`} style={{ textDecoration: "none" }}>
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{ width: "100px", justifyContent: "center" }}
                    >
                      {obj[setting]}
                      <Typography
                        sx={{
                          color: "#414B3B",
                          fontSize: "14px",
                          fontFamily: "ovo",
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </Link>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
        <Notification
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
          vertical="bottom"
          horizontal="right"
        />
      </Container>
    </AppBar>
  );
}
export default NavBar;
