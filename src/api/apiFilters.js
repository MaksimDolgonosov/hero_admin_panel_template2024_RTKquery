import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiFilters = createApi({
    reducerPath: 'apiFilters',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    // tagTypes: ["Heroes"],
    endpoints: (builder) => ({
        getFilters: builder.query({
            query: () => `/filters`,
            // providesTags: ["Heroes"]
        }),

    }),
})

export const { useGetFiltersQuery } = apiFilters;