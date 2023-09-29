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

const AddProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [imageProductPreview, setImageProductPreview] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "",
        image: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    const createNewProduct = async () => {
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/config/stores/${id}/products`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: productForm,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 201) {
                setSnackbarMessage("Product created successfully!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate(`/config/stores/${id}`);
                }, 2000);

        }})
        .catch(function (error) {
            console.log(error);
            if (error.response.status === 401) {
                handleExpire();
                setSnackbarMessage("Error creating product!");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }, 2000);
            }
        });
    };

    useEffect(() => {
        if (productForm.name !== "" && productForm.image !== "" && productForm.price !== "" && productForm.quantity !== "" && productForm.category !== "" && productForm.description !== "") {
            createNewProduct();
        }
    }, [productForm]);

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

    const handleProductFormSubmit = (event) => {
        event.preventDefault();
        console.log("form submitted");
        console.log("sadasd", event);
        setProductForm({
            name: event.target.productName.value,
            image: imageProductPreview,
            price: event.target.productPrice.value,
            quantity: event.target.productQuantity.value,
            description: event.target.productDescription.value,
            category: event.target.productCategory.value,
        });
    }
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
                Add New Products
            </Typography>
            <Box component="form"
                onSubmit= {handleProductFormSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                }}>
                <TextField 
                    id="productName" 
                    label="Name" 
                    variant="filled"
                    color="secondary"
                    defaultValue=""
                    autoComplete='off' 

                    sx={{
                        marginBottom: "20px",
                    }}
                />
                
                <ImageForm image={imageProductPreview} func={handleImageProductChange} inputId="upload-product-button" />

                <TextField 
                    id="productPrice" 
                    label="Price" 
                    variant="filled"
                    color="secondary"
                    defaultValue="" 
                    autoComplete='off'
                    sx={{
                        marginBottom: "20px",
                        marginTop: "20px",
                    }}
                />
                <TextField 
                    id="productQuantity" 
                    label="Quantity" 
                    variant="filled"
                    color="secondary"
                    defaultValue="" 
                    autoComplete='off'
                    sx={{
                        marginBottom: "20px",
                    }}
                />
                <TextField 
                    id="productCategory" 
                    label="Category" 
                    variant="filled"
                    color="secondary"
                    defaultValue="" 
                    autoComplete='off'
                    sx={{
                        marginBottom: "20px",
                    }}
                />
                <TextField 
                    id="productDescription" 
                    label="Description" 
                    variant="filled"
                    color="secondary"
                    defaultValue="" 
                    autoComplete='off'
                    sx={{
                        marginBottom: "20px",
                    }}
                />
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
                    Add Product
                </Button>
            </Box>
            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>
        </Container>
     );
}
 
export default AddProducts;