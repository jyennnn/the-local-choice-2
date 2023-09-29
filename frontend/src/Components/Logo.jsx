import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import theLocalChoiceLogo from "../assets/theLocalChoiceLogo.png";


const Logo = () => {
    return ( 
        <div style={{margin:"20px 30px"}}>
            <Link to="/" style={{textDecoration:"none"}}> 
            <img
              src={theLocalChoiceLogo}
              alt="The Local Choice"
              width="120px"
            />
            {/* <Typography
              variant="h7"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex', align:"center" },
                flexGrow: 1,
                fontFamily: 'ovo',
                fontWeight: 500,
                letterSpacing: '0.1rem',
                color: '#414B3B',
                textDecoration: 'none',
                margin:'-10px 37px',
                fontSize:'15px',
              }}
            >
              THE
            </Typography>
            <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'ovo',
              fontWeight: 500,
              letterSpacing: '0.1rem',
              color: '#414B3B',
              textDecoration: 'none',
              margin:'0px',
              fontSize: '29px'
            }}
          >
            LOCAL
          </Typography>
          <Typography
            variant="h7"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'ovo',
              fontWeight: 500,
              letterSpacing: '0rem',
              color: '#414B3B',
              textDecoration: 'none',
              margin:'0px',
              fontSize:'25px',
              margin:'-10px 37px',
            }}
          >
            choice
          </Typography> */}
          </Link>

          </div>
     );
}
 
export default Logo;