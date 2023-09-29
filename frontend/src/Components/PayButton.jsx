import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useSelector } from "react-redux";

// const token = localStorage.getItem("token");

const PayButton = () => {
  const url = BASE_URL;

  const userData = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = JSON.parse(userData);
  console.log(user._id);

  const { cartItems } = useSelector((state) => state.cart);
  // const { totalPrice } = useSelector((state) => state.cart); // total price of all items in cart
  // const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    console.log("cart item: " + cartItems, "user id: " + user._id);
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      // Handle the case when cartItems is empty or not in the expected format
      console.error("Invalid cartItems data.");
      return;
    }

    // Proceed with making the POST request
    // await axios
    //   .post(`${url}/create-checkout-session`, {
    //     cartItems,
    //     userId: user._id,
    //   })
    //   .then((res) => {
    //     if (res.data.url) {
    //       window.location.href = res.data.url;
    //     }
    //   })
    //   .catch((err) => console.log(err.message));
    await axios({
      method: "POST",
      url: `${url}/create-checkout-session`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        cartItems,
        userId: user._id,
      },
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCheckout()}
        sx={{
          backgroundColor: "#99958C",
          color: "#E4DCCD",
          width: "20ch",
          height: "70px",
          textAlign: "center",
          padding: "18px",
          "&:hover": {
            backgroundColor: "#737373",
          },
        }}
      >
        proceed to payment
      </Button>
    </>
  );
};

export default PayButton;

// original
// import { Button } from "@mui/material";
// import axios from "axios";
// import { BASE_URL } from "../constants";

// // const token = localStorage.getItem("token");

// const PayButton = ({ cartItems }) => {
//   const url = BASE_URL;

//   const userData = localStorage.getItem("user");
//   const user = JSON.parse(userData);
//   console.log(user._id);

//   const handleCheckout = () => {
//     axios
//       .post(`${url}/stripe/create-checkout-session`, {
//         cartItems,
//         userId: user._id,
//       })
//       .then((res) => {
//         if (res.data.url) {
//           window.location.href = res.data.url;
//         }
//       })
//       .catch((err) => console.log(err.message));
//     console.log("cart item: " + cartItems, +"user " + user._id);
//   };
//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => handleCheckout()}
//         sx={{
//           backgroundColor: "#99958C",
//           color: "#E4DCCD",
//           width: "20ch",
//           height: "70px",
//           textAlign: "center",
//           padding: "18px",
//           "&:hover": {
//             backgroundColor: "#737373",
//           },
//         }}
//       >
//         proceed to payment
//       </Button>
//     </>
//   );
// };

// export default PayButton;
