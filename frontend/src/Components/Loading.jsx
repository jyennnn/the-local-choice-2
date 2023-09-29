import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = (props) => {
    return ( 
        <div style={{minHeight:'100vh', backgroundColor: `${props.bgColor}`, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress color="secondary" />
        </div>
    );
}
 
export default Loading;
