import { Button } from "@mui/material";

const ImageForm = ( props) => {
    return (
        <div style={{ display: "flex", flexDirection:"column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <img src={props.image} style={{width: "30%", marginBottom: "20px"}} />
            <label htmlFor={props.inputId}>
            <input
                style={{ display: 'none' }}
                id={props.inputId}
                type="file"
                onChange={props.func}
            />
            <Button variant="contained" component="span"
                sx={{
                    backgroundColor:"#75695a",
                    color: "primary.light",
                    boxShadow: "none",
                    '&:hover': {
                    backgroundColor: '#e4dccd',
                    color:"#75695a",
                    opacity: [0.9, 0.8, 0.7],
                }
                }}>
                Upload Image
            </Button>
            </label>
        </div>
    )
}
export default ImageForm;