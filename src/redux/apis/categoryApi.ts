import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params
      }),
      providesTags: ["category"]
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi;