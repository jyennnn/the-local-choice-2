import { Grid, Card, CardMedia, CardContent, Link, Typography } from "@mui/material"

const StoreProductView = (product) => {
  return (
    <>
        <CardMedia
        component="img"
        height="280"
        image={product.image}
        alt={product.name}
        sx={{
            objectFit: "contain",
            width: "90%",
            margin: "0 auto",
        }}
        />
        <CardContent>
        <Link key={product._id} to={`/products/${product._id}`}
                sx={{
                    textDecoration: 'none', // Remove underline
                }}>
            <Typography
            gutterBottom
            component="div"
            sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: '15px',
                fontWeight: 500,
                color: "primary.contrastText",
                margin: "0px",
                '&:hover': {
                    color: 'secondary.main', // Change color on hover
                }
            }}
            >
            {product.name}
            </Typography>
        </Link>
            <Typography
                gutterBottom
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: "secondary.main",
                    textDecoration: "none",
                    margin: "0px",
                }}
                >   
            ${product.price.toFixed(2)}
            </Typography>
        </CardContent>
    </>
  )
}

export default StoreProductView