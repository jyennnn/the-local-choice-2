import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import ImageForm from "../Components/ImageForm";
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import { handleExpire } from "../utils/logoutUtils";
import Notification from "../Components/Notification";

const EditProduct = (props) => {
    const { id, productId } = useParams();
    console.log("id", id);
    console.log("productId", productId);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [productForm, setProductForm] = useState({
        price: "",
        quantity: "",
        description: "",
        category: "",
        image: "",
    }); 
    const [imageProductPreview, setImageProductPreview] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleImageProductChange = (event) => {
        console.log("image changed")
        const file = event.target.files[0];
        // console.log(file);
        if (file) {
            // Create an image preview
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                console.log(reader.result)
                setImageProductPreview(reader.result);
            };
        }
    };
    const updateProduct = async () => {
        await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/config/stores/${id}/products/${productId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: productForm,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                setSnackbarMessage("Product updated successfully!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                console.log("Created successfully");
                setTimeout(() => {
                    navigate(`/config/stores/${id}`);
                }, 2000);
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.status === 401) {
                setOpenSnackbar(true);
                setSnackbarMessage("Please login or create an account to view this page! Redirecting in 3 seconds...");
                setSnackbarSeverity("error");
                handleExpire();
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }
                , 3000);
            }
        });
    };

    useEffect(() => {
        if (productForm.price !== "" && productForm.quantity !== "" && productForm.category !== "" && productForm.description !== "") {
            updateProduct();
        }
    }, [productForm]);

    const handleProductFormSubmit = (event) => {
        event.preventDefault();
        console.log("form submitted");
        console.log("sadasd", event);
        setProductForm({
            price: event.target.productPrice.value,
            quantity: event.target.productQuantity.value,
            description: event.target.productDescription.value,
            category: event.target.productCategory.value,
            image: imageProductPreview,
        });

    }
    const getStores = async () => {
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/config/stores/${id}/products/${productId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data);
            setStore(response.data);
            setImageProductPreview(response.data.image);
            setOpenSnackbar(true);
            setSnackbarMessage("Product retrieved successfully!");
            setSnackbarSeverity("success");
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                setOpenSnackbar(true);
                setSnackbarMessage("Please login or create an account to view this page! Redirecting in 3 seconds...");
                setSnackbarSeverity("error");
                handleExpire();
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }
                , 3000);
            }
        });
    }

    useEffect(() => {
        getStores();
    }, []);

    return ( 
        <Container minWidth="xs" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    color: "#414B3B",
                    marginBottom: "20px",
                    marginTop: "20px",
                }}
            >
                Edit Product
            </Typography>
            {store ?
            <Box component="form"
                onSubmit= {handleProductFormSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                }}>

                <TextField 
                    id="productPrice" 
                    label="Price" 
                    variant="outlined"
                    color="secondary"
                    defaultValue={store.price}
                    sx={{
                        marginBottom: "20px",
                        marginTop: "20px",
                    }}
                />
                <TextField 
                    id="productQuantity" 
                    label="Quantity" 
                    variant="outlined"
                    color="secondary"
                    defaultValue={store.quantity} 
                    sx={{
                        marginBottom: "20px",
                    }}
                />
                <TextField 
                    id="productCategory" 
                    label="Category" 
                    variant="outlined"
                    color="secondary"
                    defaultValue={store.category} 
                    sx={{
                        marginBottom: "20px",
                    }}
                />
                <TextField 
                    id="productDescription" 
                    label="Description" 
                    variant="outlined"
                    color="secondary"
                    defaultValue={store.description}
                    sx={{
                        marginBottom: "20px",
                    }}
                />
                <ImageForm image={imageProductPreview} func={handleImageProductChange} inputId="upload-product-button" />
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#99958C",
                        color: "#E4DCCD",
                        marginTop: "20px",
                        '&:hover': {
                            backgroundColor: '#e4dccd',
                            color:"#75695a",
                            opacity: [0.9, 0.8, 0.7],
                        }
                    }}
                >
                    Save Changes
                </Button>
            </Box>: null
            }
            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>
        </Container>
     );
}
 
export default EditProduct;