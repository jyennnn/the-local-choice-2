import { Container, Grid, Typography, Button, TextField } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SidePanel from "../Components/SidePanel";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
const formStyles = {
    width: "60%",
    backgroundColor: "#F3EFE7",
    borderRadius: "5px",
    margin: "0px 20px",
    color: "#645B4F",
    borderColor: "#E4DCCD",
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E4DCCD',
        },
        '&:hover fieldset': {
            borderColor: '#E4DCCD',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#E4DCCD',
        },
    }
};

const RenderTextField = ({ label, placeholder, type = "text", defaultValue, disabled = false, id }) => (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", width: "100%" }}>
        <Typography variant="subtitle1" sx={{ fontFamily: "Poppins", fontSize: "16px", width: "20%", textAlign: "right", color: "#99958C" }}>
            {label}
        </Typography>
        <TextField
            required
            id={id}
            size="small"
            variant="outlined"
            color="secondary"
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            sx={formStyles}
            disabled={disabled}
        />
    </Container>
);


const Profile = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profile: {
            phoneNumber: "",
            address: "",
            unitNumber: "",
            postalCode: "",
            country: "",
            city: "",
        }
    })

    const [loading, setLoading] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        setForm({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            profile: {
                phoneNumber: e.target.phoneNumber.value,
                address: e.target.address.value,
                unitNumber: e.target.unitNumber.value,
                postalCode: e.target.postalCode.value,
                country: e.target.country.value,
                city: e.target.city.value,
            }
        });
    }

    const getProfile = async () => { 
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/profile`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function (response) {
            setLoading(true);
            console.log(response);
            if (response.status === 200) {
                console.log("get successfully");
                console.log("adssad",response.data.user);
                const userData = response.data.user;
                if (userData) {  // Ensuring the user data exists before setting the state
                    setForm({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        password: userData.password,
                        profile: {
                            phoneNumber: userData.profile.phoneNumber,
                            address: userData.profile.address,
                            unitNumber: userData.profile.unitNumber,
                            postalCode: userData.profile.postalCode,
                            country: userData.profile.country,
                            city: userData.profile.city,
                        }
                    });
                } else {
                    console.error("User data missing in response!");  // Log if the user data doesn't exist in the response
                }
                setLoading(false);
            }
        }
        ) 
        .catch(function (error) {
            console.log(error);
        }
        );
    };

    const postProfile = async() => {
        await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/profile/update`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: form,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log("updated successfully");
                navigate(`/profile`);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        if (form.firstName && form.lastName && form.email && form.password && form.profile.phoneNumber && form.profile.address && form.profile.unitNumber && form.profile.postalCode && form.profile.country && form.profile.city) {
            postProfile();
        }
    }, [form]);
    
    useEffect(() => {
        getProfile();
    }, []);


    return (
        <>
            
            {loading ? 
            <Grid container spacing={0} component="form" onSubmit={onSubmit}>
                <SidePanel page={"profile"} route={"profile"} />
                <Grid item xs={8.5} sx={{ backgroundColor: '#F8F5ED', margin: "30px 0px", borderRadius: "15px", flexGrow: "1", display:"flex", justifyContent:"center", alignItems:"center" , minHeight:"80vh"}}>
                    <CircularProgress color="secondary" />
                </Grid>
            </Grid>
            : (
                <Grid container spacing={0} component="form" onSubmit={onSubmit}>
                <SidePanel page={"profile"} route={"profile"} />
                <Grid item xs={8.5} sx={{ backgroundColor: '#F8F5ED', margin: "30px 0px", borderRadius: "15px", flexGrow: "1" }}>
                    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#E4DCCD", minWidth: "80%", minHeight: "70vh", margin: "40px auto", borderRadius: "10px" }}>
                        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F3EFE7", width: "60px", height: "60px", borderRadius: "50%", marginTop: "15px" }}>
                            <PersonOutlineIcon sx={{ fontSize: "30px", color: "#645B4F" }} />
                        </Container>
    
                        <RenderTextField label="first name" defaultValue={form.firstName} id={"firstName"} />
                        <RenderTextField label="last name" defaultValue={form.lastName} id={"lastName"} />
                        <RenderTextField label="email" defaultValue={form.email} id={"email"} />
                        <RenderTextField label="phone number" defaultValue={form.profile.phoneNumber} placeholder="12345678" id = {"phoneNumber"} />
                        <RenderTextField label="address" defaultValue={form.profile.address} placeholder="1234 Main St" id = {"address"} />
                        <RenderTextField label="unit number" defaultValue={form.profile.unitNumber} placeholder="#1-123" id={"unitNumber"} />
                        <RenderTextField label="postal code" defaultValue={form.profile.postalCode} placeholder="123456" id={"postalCode"} />
                        <RenderTextField label="country" defaultValue={form.profile.country} placeholder="Singapore" id={"country"} />
                        <RenderTextField label="city" defaultValue={form.profile.city} placeholder="Singapore" id={"city"} />
                        <RenderTextField label="password" defaultValue={form.password} type="password" disabled={true} id = {"password"} />
    
                        <Button type="submit" variant="contained"
                            sx={{
                                display: "flex",
                                backgroundColor: "#99958C",
                                color: "#E4DCCD",
                                width: "50%",
                                textAlign: "center",
                                margin: "30px 0px 30px 0px",
                                '&:hover': {
                                    backgroundColor: "#737373",
                                },
                            }}
                        >
                            update profile
                        </Button>
    
                    </Container>
                </Grid>
            </Grid>
            )}

        </>
    );
}

export default Profile;