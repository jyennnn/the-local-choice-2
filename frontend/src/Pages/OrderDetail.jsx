import { Grid, Typography } from "@mui/material";
import Stack from "@mui/system/Stack";
import SidePanel from "../Components/SidePanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import ordersList from "../orderslist";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const orderId = useSelector((state) => state.orderData.orderId);
  const orderData = useSelector((state) => state.orderData.orderData);

  function ccyFormat(num) {
    return num ? `${num.toFixed(2)}` : "0.00";
  }

  // function priceRow(qty, unit) {
  // return qty * unit;
  // }

  // function createRow(desc, qty, unit) {
  // const price = priceRow(qty, unit);
  // return { desc, qty, unit, price };
  // }

  const subtotal = (items) => {
    const subtotals = items.map((item) => {
      return item.qty * item.price;
    });

    return subtotals.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  };
  const invoiceSubtotal =
    orderData && orderData.orderItems ? subtotal(orderData.orderItems) : 0;

  // const invoiceSubtotal = subtotal(orderData.orderItems);

  const orderDate = orderData.createdAt;
  const newDate = new Date(orderDate);
  // const formattedDate = newDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedDate = orderData
    ? new Date(orderData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // const navigate = useNavigate();

  // const { id } = useParams();
  // const currentOrder = ordersList.find((order) => order._id === id);

  return (
    <>
      <Grid container spacing={0} style={{ height: "89vh" }}>
        <SidePanel page={"orders"} route={"orders"} />
        <Grid item xs={8.5}>
          <Stack
            direction={{ xs: "column" }}
            spacing={{ xs: 3 }}
            alignItems={"center"}
            marginTop={6}
            marginRight={5}
            paddingTop={3}
            style={{
              backgroundColor: "#f3efe7",
              height: "75vh",
              borderRadius: "30px",
            }}
            justifyContent={"flex-start"}
          >
            <p
              style={{
                color: "#99958c",
                fontSize: "13px",
                marginTop: "25px",
              }}
            >{`Order #${orderData.orderId} was placed on ${formattedDate} and is currently ${orderData.status}.`}</p>
            <Typography
              sx={{
                inHeight: "100vh",
                maxWidth: "60%",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#75695A",
                fontSize: "26px",
                overflowY: "hidden",
              }}
            >
              Order Details
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                width: "80%",
                backgroundColor: "transparent",
                boxShadow: "none",
                paddingBottom: "80px",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.qty}</TableCell>
                      <TableCell align="right">{`$${ccyFormat(
                        item.price
                      )}`}</TableCell>
                      <TableCell align="right">{`$${ccyFormat(
                        item.price * item.qty
                      )}`}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{`$${ccyFormat(
                      invoiceSubtotal
                    )}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Shipping</TableCell>
                    <TableCell align="right">Free</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Discount</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "bold" }}
                    >{`$${ccyFormat(invoiceSubtotal)}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetail;
