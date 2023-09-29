
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const PlaceOrderCheckout = () => {

//     const [ toPaid, setToPaid ] = useState(false)

//     const { id } = useParams();
//     const navigate = useNavigate();
    
//     const payHandler = (event) => {
//         event.preventDefault();
//         console.log("mark as paid");
//         setToPaid(true);
//     }

//     useEffect(() => {
//         updateToPaid();
//     }, [toPaid]);


//     const updateToPaid = () => {
//         axios({
//             method: "PUT",
//             url: `/orders/${id}`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: {isPaid: toPaid},
//         })
//         .then(function (response) {
//             console.log(response);
//             if (response.status === 201) {
//                 console.log("Updated to paid successfully");
//                 navigate(`/orders/${id}`);
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     };

    
//   return (
//     <>
//     <br/>
//     <h4>card details</h4>
//     <p>number</p>
//     <p>security</p>
//     <p>exp</p>
//     <br/>
//     <button onClick={payHandler}>pay</button>
//     </>
//   )
// }

// export default PlaceOrderCheckout