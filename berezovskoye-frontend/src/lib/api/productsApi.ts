import {applicationApi} from "@/lib/api/applicationApi";
import {News, Product} from "@/database";

export const productsApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
            query: () => '/products',
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'Product' as const, id})), {type: 'Product', id: 'LIST'}]
                    : [{type: 'Product', id: 'LIST'}],
        }),
        getProductById: build.query<Product, { id: number }>({
            query: ({id}) => `/products/${id}`,
            providesTags: (result) =>
                result
                    ? [({type: 'Product', id: result.id})]
                    : [{type: 'Product', id: 'LIST'}],
        }),
        updateProductImage: build.mutation<News, { id: number, product: Product, imgFile: File | null }>({
            query: ({id, product, imgFile}) => {
                const formData = new FormData();

                formData.append('product', JSON.stringify(product));
                if (imgFile)
                    formData.append('imgFile', imgFile);

                return {
                    url: `/products/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg.id}],
        }),
    })
});

export const {
    useGetProductByIdQuery,
    useGetProductsQuery,
    useUpdateProductImageMutation
} = productsApi;