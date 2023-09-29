
import { Grid, Typography, Box, Container } from "@mui/material"
import { Link } from "react-router-dom";

const StoresOverviewDisplay = (store) => {
  return (
    <>  
            
            <Grid container spacing={1}
                            direction="row">
                    <Grid item md={12} 
                                sx={{ display: 'flex',
                                    justifyContent: 'flex-start',
                                    }}
                                >
                        <Link to={`/stores/${store._id}`}
                                style={{ textDecoration: "none", color: "inherit" }}>
                        <img src={store.image} alt={store.name}
                            style={{ 
                                    width: '140px', 
                                    height: 'auto',
                                    paddingTop: '10px'
                                    }} />
                        </Link>
                    </Grid>
                
                {store.products.map((item,idx) => 
                ( idx < 4 ?
                <Grid item md={3} xs={12} 
                            sx={{ display: 'flex', 
                            justifyContent: 'center',
                            }}>
                    <Link to ={`/stores/${store._id}/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>

                        <img src={item.image} 
                            style={{ width: '200px', }} />
                        <Typography gutterBottom  
                                    component="div"
                                    sx ={{
                                        fontSize:"14px",
                                        fontWeight: '500',
                                    }}>
                        {item.name}
                        </Typography>
                        <Typography gutterBottom component="div"
                        sx ={{
                            fontSize:"13px",
                            fontWeight: '300',
                        }}>
                        ${item.price.toFixed(2)}
                        </Typography>
                    </Link>
                </Grid>

                : null))}
            </Grid>
        </>
  )
}

export default StoresOverviewDisplay




/// Backup 
{/* <Box 
                sx={{
                    marginLeft: '50px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: '200px',
                }}> 
            <Typography gutterBottom variant="h6" component="div"
                sx={{
                    margin: "10px 30px",
                    display: "flex",
                    justifyContent: "flex-start",
                    '&:hover': {
                        color: "secondary.main",
                        cursor: "pointer",
                    }
                }}>  
                    
                    </Box>
             </Typography> 
            
            <Grid container spacing={{ xs: 1, md: 1 }}>
                {store.products.map((item,idx) => (
                    idx<4 ?
                    <Grid item xs={3} key={idx}>
                    <Link to ={`/stores/${store._id}/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>

                        <img src={item.image} 
                            style={{ width: '200px', 
                                    marginLeft: '50px'}} />
                        <Typography gutterBottom  component="div"
                        sx ={{
                            fontFamily: "Poppins",
                            fontSize:"16px",
                            marginBottom:"5px",
                            display:"flex",
                            justifyContent:"center",
                        }}>
                        {item.name}
                        </Typography>
                        <Typography gutterBottom component="div"
                        sx ={{
                            fontFamily: "Poppins",
                            fontSize:"15px",
                            marginBottom:"5px",
                            display:"flex",
                            justifyContent:"center",
                        }}>
                        {item.price}
                        </Typography>
                    </Link>

                    </Grid>
                    : null
                ))} 
            </Grid>  */}