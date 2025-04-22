import {applicationApi} from "@/lib/api/applicationApi";
import {News} from "@/database";

export const newsApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getNews: build.query<News[], void>({
            query: () => '/news',
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'News' as const, id})), {type: 'News', id: 'LIST'}]
                    : [{type: 'News', id: 'LIST'}],
        }),
        getNewsById: build.query<News, { id: number }>({
            query: ({id}) => `/news/${id}`,
            providesTags: (result) =>
                result
                    ? [({type: 'News', id: result.id})]
                    : [{type: 'News', id: 'LIST'}],
        }),
        addNews: build.mutation<News, { news: News }>({
            query: ({news}) => ({
                url: '/news',
                method: 'POST',
                body: news,
            }),
            invalidatesTags: ['News'],
        }),
        updateNews: build.mutation<News, { id: number; news: News }>({
            query: ({id, news}) => ({
                url: `/news/${id}`,
                method: 'PUT',
                body: news,
            }),
            invalidatesTags: (result, error, arg) => [{type: 'News', id: arg.id}],
        }),
        deleteNews: build.mutation<void, { id: number }>({
            query: ({id}) => ({
                url: `/news/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'News', id: arg.id}],
        }),
    }),
});

export const {
    useGetNewsQuery,
    useGetNewsByIdQuery,
    useAddNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = newsApi;