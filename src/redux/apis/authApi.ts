import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["auth"]
    }),
    signIn: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    verifyOtp: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: payload,
        credentials: "include",
        headers: {
          "token": token
        },
      }),
      invalidatesTags: ["auth"]
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    resetPassword: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: payload,
        headers: {
          "token": token
        }
      }),
      invalidatesTags: ["auth"]
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    getAuthBanners: builder.query({
      query: () => ({
        url: "/banners",
        method: "GET",
      }),
      providesTags: ["banners"]
    }),
    connectStripe: builder.mutation({
      query: () => ({
        url: "/stripe/connect",
        method: "PATCH"
      }),
      invalidatesTags: ["auth"]
    })
  }),
})

export const { useSignInMutation, useSignUpMutation, useVerifyOtpMutation, useResetPasswordMutation, useChangePasswordMutation, useForgotPasswordMutation, useGetAuthBannersQuery, useConnectStripeMutation } = authApi;