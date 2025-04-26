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
        addNews: build.mutation<News, { news: News, imgFile: File | null }>({
            query: ({news, imgFile}) => {
                const formData = new FormData();

                formData.append('news', JSON.stringify(news));
                if (imgFile)
                    formData.append('imgFile', imgFile);

                return {
                    url: `/news`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['News'],
        }),
        updateNews: build.mutation<News, { id: number, news: News, imgFile: File | null }>({
            query: ({id, news, imgFile}) => {
                const formData = new FormData();

                formData.append('news', JSON.stringify(news));
                if (imgFile)
                    formData.append('imgFile', imgFile);

                return {
                    url: `/news/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
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