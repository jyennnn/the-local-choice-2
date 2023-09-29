import { Grid, Card, Typography } from "@mui/material"
import drawer from "../assets/drawer.png";
import hangingPlant from "../assets/hangingPlant.png";

import { useNavigate, useParams } from 'react-router-dom';
import { useGetStoreByIdQuery } from "../Slices/storeSlice";
import { handleExpire } from "../utils/logoutUtils";
import { useState, useEffect } from "react";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortedProducts } from "../Slices/sortingSlice";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StoreProductView from "../Components/StoreProductView";
import IconButton from '@mui/material/IconButton';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';


const Store = () => {
  const navigate = useNavigate();

  // fetch store by ID
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const { data: currentStore, isLoading, error } = useGetStoreByIdQuery({ storeId: id, token });

  // states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [type, setType] = useState('');

  // redux (store products & sort)
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sorting.sortBy);
  const sortedProducts = useSelector((state) => state.sorting.sortedProducts);
  
  // Sort products by name
  const sortByName = () => {
    const sorted = [...currentStore.store.products].sort((a, b) => a.name.localeCompare(b.name));
    dispatch(setSortBy('name'));
    dispatch(setSortedProducts(sorted));
  };

  // Sort products initial
  const sortByInitial = () => {
    const sorted = currentStore.store.products
    dispatch(setSortBy('initial'));
    dispatch(setSortedProducts(sorted));
  };

  // Sort products by price
  const sortByPrice = () => {
    const sorted = [...currentStore.store.products].sort((a, b) => a.price - b.price);
    dispatch(setSortBy('price'));
    dispatch(setSortedProducts(sorted));
  };

  // handle sort
  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value === 'name') { 
      sortByName();
    } else if (event.target.value === 'price') {
      sortByPrice();
    }
  };

  // Pages logic 
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = sortedProducts.length

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // handle page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
  };

  const viewProduct = (productId) => {
    navigate(`/stores/${id}/${productId}`)
  }

  // errors
  useEffect(() => {
    if (error?.status === 401) {
        console.log("401 error");
        setOpenSnackbar(true);
        setSnackbarMessage("Please login or create an account to view this page!");
        setSnackbarSeverity("error");
        handleExpire();
        setTimeout(() => {
            navigate("/login");
            window.location.reload();
        }
        ,3000);
    }
  }, [error]); 


  // sort by initial after data fetched 
  useEffect(() => {
    if (currentStore) {
      sortByInitial();
    }
  }, [currentStore]);


  return (
    <>  
          { isLoading ? 
            <Loading bgColor="primary.light"/>
          : error ? 
            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>
          : (
            <>
            <Grid container spacing={0}>
                <Grid item md={4} sx={{ display: { xs: 'none', md: 'inline' }}}>
                    <img src={hangingPlant} style={{ width: "250px"}}/>
                </Grid>
                <Grid item md={4} xs={12} style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                    <img src={currentStore.store.image} style={{ width: "250px"}}/>
                </Grid>
                <Grid item md={4} sx={{ display: { xs: 'none', md: 'inline' }}}>
                    <img src={drawer} style={{ width: "250px"}}/>
                </Grid>
            </Grid>

            <Grid container spacing={0} sx={{
                                            bgcolor: 'primary.light',
                                            p: 3,
                                            justifyContent: "flex-end",
                                            }} >
                <Grid item lg={1.5}
                           md={2}
                           xs={3} sx={{marginRight: '20px'}}>
                  <FormControl sx={{ m: 1, minWidth: 120}} size="small">
                    <Select
                      displayEmpty
                      id="sortby"
                      value={type}
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={handleChange}
                      sx={{
                        fontSize: '12px',
                        color: 'primary.contrastText'
                      }}
                    >
                    <MenuItem disabled value="" 
                              sx={{
                                fontSize: '12px',
                                color: 'primary.contrastText'
                                }}
                    >
                      <em>sort by</em>
                    </MenuItem>
                      <MenuItem value={'name'} 
                                sx={{
                                fontSize: '12px',
                                color: 'primary.contrastText'
                                }}
                      >
                      name
                      </MenuItem>
                      <MenuItem value={'price'}
                                sx={{
                                  fontSize: '12px',
                                  color: 'primary.contrastText'
                                  }}
                      >price</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>

            <Grid container rowSpacing={5} spacing={1} sx={{
                                            bgcolor: 'primary.light',
                                            paddingTop: 1,
                                            paddingLeft: 8,
                                            paddingRight: 8, 
                                            justifyContent: "center",
                                            }} >
              
              {
                sortedProducts.slice(startIndex, endIndex).map((product) => (
                <Card
                  key={product._id}
                  sx={{
                  minWidth: 345,
                  margin: "30px 15px",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  outline: "none",
                  '&:hover': {
                      cursor: "pointer",
                  }
                  }}
                  onClick={() => viewProduct(product._id)}
                >
                {StoreProductView(product)}
                </Card>
                ))
              }
            </Grid>
            </>
          )}

        <Grid container spacing={0} sx={{
                                        bgcolor: 'primary.light',
                                        p: 5,
                                        paddingTop: 8,
                                        }} >
            <Grid item xs={2}>
              <IconButton onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}>
                <ArrowDropDownCircleOutlinedIcon style={{ transform: 'rotate(90deg)' }} />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
                <Typography
                gutterBottom
                component="div"
                sx={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: "primary.contrastText",
                    textDecoration: "none",
                    margin: "0px",
                }}
                >
                PAGE {currentPage} / {Math.ceil(totalItems / itemsPerPage)} 
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                >
                  <ArrowDropDownCircleOutlinedIcon style={{ transform: 'rotate(270deg)' }} />
                </IconButton>
            </Grid>
        </Grid>


    </>
  )
}

export default Store