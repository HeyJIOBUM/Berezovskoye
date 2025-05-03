import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApiUrl = "http://localhost/api";

export const applicationApi = createApi({
    reducerPath: 'applicationApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
    }),
    tagTypes: ["News", "Product"],
    endpoints: () => ({}),
});