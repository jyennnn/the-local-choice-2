const orderModel  = require("../models/orderModel");
const User = require("../models/user");
const Store = require('../models/store');

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
    createCheckoutSession,
    createOrder,
};

async function createCheckoutSession(req,res) {
  const { cartItems, userId } = req.body; 

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty." });
  }
  
  // customise data, keep only essential information for metadata
  const metadataCartItems = cartItems.map(item => {
    return {
        name: item.name,
        id: item._id, 
        quantity: item.quantity,
        price: item.price,
        storeId: item.storeId,
    };
  });

  // check if metadata is too large
  const metadataString = JSON.stringify({ userId, cart: metadataCartItems });
  if (metadataString.length > 500) {
      return res.status(400).json({ error: "Metadata is too large." });
  }

  // create customer
  const customer = await stripe.customers.create({
    metadata: {
      userId: userId.toString(),
      cart: metadataString,
    },
  });

  // create line items for stripe checkout
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "sgd",
      product_data: {
        name: item.name,
        metadata: {
          id: item._id,
        },
      },
      unit_amount: Math.round(item.price * 100), // Convert the unit price to cents and round up because of the decimal
    },

    quantity: item.quantity, 
  }));
  
  // create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["SG"],
    },
    line_items: lineItems, 
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/scsuccess/session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/sccancel`,
  });

  res.json({ url: session.url });
}

async function createOrder(req, res) {
  try {
    // get session id to retrieve session details
    let { session_id } = req.params;
    if (session_id.startsWith('session_id=')) {
      session_id = session_id.replace('session_id=', ''); // remove the prefix
    }

    console.log("Corrected Session ID:", session_id);
    // retrieve session details
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customer = await stripe.customers.retrieve(session.customer);

    if (!customer.metadata || !customer.metadata.cart) {
      return res.status(400).json({ errorMsg: "Cart data is missing in customer metadata" });
    }

    const cartData = JSON.parse(customer.metadata.cart);
    const cartItems = cartData.cart;

    // pass data into order model in correct format
    const formattedOrderItems = cartItems.map(item => ({
      name: item.name,
      id: item.id,
      qty: item.quantity,
      price: item.price
    }));

    console.log("customer", customer)
    console.log("session", session)
    console.log("cartItems", cartItems)

    const order = new orderModel({
      user: customer.metadata.userId,
      stripeId: session.id,
      orderId: customer.invoice_prefix,
      orderItems: formattedOrderItems,
      shippingAddress: {
        address: session.shipping_details.address.line1 + " " + session.shipping_details.address.line2,
        postalCode: session.shipping_details.address.postal_code,
        country: session.shipping_details.address.country,
      },
      paymentMethod: "Card",
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: session.amount_total / 100,
      isPaid: true,
      paidAt: Date.now(),
      status: "Pending",
    });

    // update the store inventory
    cartItems.forEach(async (item) => {
      const store = await Store.findById(item.storeId);
      const product = store.products.id(item.id); 
      product.quantity -= item.quantity; // update the quantity

      await store.save(); // save the store
    });
    
    await order.save();
    res.status(201).json({ title: "Update and create order", order });

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}


