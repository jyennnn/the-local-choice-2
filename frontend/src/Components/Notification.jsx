import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Notification = (props) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
            open={props.openSnackbar}
            autoHideDuration={6000} // 6 seconds
            onClose={props.handleCloseSnackbar} // This function is called when the snackbar closes
            message={props.snackbarMessage}
            key={props.vertical + props.horizontal}
        >
            <Alert onClose={props.handleCloseSnackbar} severity={props.snackbarSeverity} sx={{ width: '100%' }}>
                {props.snackbarMessage}
            </Alert>
        </Snackbar>
    )
}

export default Notification;