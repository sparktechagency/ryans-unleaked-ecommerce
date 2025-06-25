import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["order"]
    }),
    initiatePayment: builder.mutation({
      query: (payload) => ({
        url: "/payments/checkout",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["order"]
    }),
    getMyOrders: builder.query({
      query: (params) => ({
        url: "/orders/my-orders",
        method: "GET",
        params
      }),
      providesTags: ["order"]
    }),
    getPayment: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET"
      })
    }),
  }),
})

export const { useCreateOrderMutation, useInitiatePaymentMutation, useGetMyOrdersQuery, useGetPaymentQuery } = orderApi;