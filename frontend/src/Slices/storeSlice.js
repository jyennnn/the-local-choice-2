import { STORE_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (token) => {
                return {
                    url: STORE_URL,
                    method: "GET",
                    // credentials: 'include',
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
                    // credentials: 'include',
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