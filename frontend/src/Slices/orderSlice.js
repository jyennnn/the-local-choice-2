import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) =>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }), 
        payOrder: builder.mutation({
            query: (orderId, details) => ({
                url: `ORDERS_URL/${orderId}`,
                method: 'PUT',
                body: { ...details },
            }),
        }), 
        getMyOrder: builder.query({
            query: ({userId, token}) => {
                return {
                    url: "orders/myorders",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            keepUnusedDataFor: 30
        }),
        getMyOrderById: builder.query({
            query: ({orderId, token}) => {
                return {
                    url: `orders/myorders/${orderId}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            keepUnusedDataFor: 30
        })
    })
})

export const { useCreateOrderMutation, usePayOrderMutation, useGetMyOrderQuery, useGetMyOrderByIdQuery } = ordersApiSlice