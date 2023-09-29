import { Typography } from "@mui/material";
import Sign from "../assets/tlc-landingPage/tlcSign.png";
import Plant from "../assets/tlc-landingPage/tlcPlant.png";
import Carpet from "../assets/tlc-landingPage/tlcCarpet.png";
import Door from "../assets/tlc-landingPage/tlcDoor.png";
import DoorCarpet from "../assets/tlc-landingPage/DoorCarpet.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { useDispatch, useSelector } from 'react-redux';

const LandingPage = () => {
  // const dispatch = useDispatch();
  // const allStores = useSelector((state) => state.allStores.stores);

  const swingAnimation = {
    hover: {
      rotate: [-15, 15, -10, 10, -5, 5, 0],
      transition: {
        duration: 1.0,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1.5 }}
      >
        <div
          style={{
            height: "89vh",
            width: "100%",
            margin: "0 auto",
            backgroundColor: "#F3EFE7",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            overflowY: "hidden",
          }}
        >
          <Link
            to="/login"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div>
                    <img src={Plant} style={{width:"200px"}}/>
                </div> */}
            <motion.div
              whileHover="hover"
              variants={swingAnimation}
              style={{ originX: "50%", originY: "0%" }} // This is the point around which the element rotates
            >
              <img src={Plant} alt="Plant" style={{ width: "200px" }} />
            </motion.div>
          </Link>
          <Link
            to="/login"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              <img src={DoorCarpet} style={{ width: "400px" }} />
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Sign} style={{ width: "200px" }} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;
