import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApiUrl = "http://localhost:8080";

export const applicationApi = createApi({
    reducerPath: 'applicationApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        // prepareHeaders: headers => {
        //     headers.set('Content-Type', 'application/json;charset=UTF-8');
        //     return headers;
        // },
    }),
    tagTypes: ["News", "Product"],
    endpoints: () => ({}),
});