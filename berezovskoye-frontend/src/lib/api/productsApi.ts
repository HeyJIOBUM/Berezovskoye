import {applicationApi} from "@/lib/api/applicationApi";
import {Product} from "@/database";

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
    })
});

export const {
    useGetProductByIdQuery,
    useGetProductsQuery
} = productsApi;