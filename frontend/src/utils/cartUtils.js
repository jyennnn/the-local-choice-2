
export const addDecimals = (num) => {
    return (Math.round(num * 100)/ 100).toFixed(2)
}

export const updateCart = (state) => {
    //calculate items price 
    state.price = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))

    //shipping price (if order is over $100, free, else $10 shipping)
    // state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
    state.shippingPrice = addDecimals(state.price > 100 ? 0 : 0)

    //total price 
    state.totalPrice = (
        Number(state.price) +
        Number(state.shippingPrice)
    ).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))

    return state

    }