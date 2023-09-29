import { STORE_URL } from "../constants";
import { apiSlice } from "./apiSlice";
// import authSliceReducer from "./authSlice";

// const token = localStorage.getItem('token');

// export const storesApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getStores: builder.query({
//             query: () =>({
//                 url: STORE_URL,
//                 method: "GET",
//                 headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//                 },
//             }),
//             keepUnusedDataFor: 30
//         }), 
//         getStoreById: builder.query({
//             query: (storeId) =>({
//                 url: `stores/${storeId}`,
//                 method: "GET",
//                 headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//                 },
//             }),
//             keepUnusedDataFor: 30
//         }), 
//         // payOrder: builder.mutation({
//         //     query: (orderId, details) => ({
//         //         url: `ORDERS_URL/${orderId}`,
//         //         method: 'PUT',
//         //         body: { ...details },
//         //     }),
//         // }), 
//     })
// })


export const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (token) => {
                return {
                    url: STORE_URL,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            keepUnusedDataFor: 30
        }),
        

        getStoreById: builder.query({
            query: ({storeId, token}) => {
                return {
                    url: `stores/${storeId}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            keepUnusedDataFor: 30
        }),
    })
})

export const { useGetStoresQuery, useGetStoreByIdQuery } = storesApiSlice