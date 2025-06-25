import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params
      }),
      providesTags: ["user"]
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET"
      }),
      providesTags: ["user"]
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET"
      }),
      providesTags: ["user"]
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ["user"]
    }),
  }),
})

export const { useGetSingleUserQuery, useGetAllUsersQuery, useGetUserProfileQuery, useUpdateProfileMutation } = userApi;