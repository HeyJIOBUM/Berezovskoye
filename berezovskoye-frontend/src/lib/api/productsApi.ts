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
        updateProduct: build.mutation<Product, {
            id: string,
            imgFile?: File,
            visible?: boolean,
            price?: File
        }>({
            query: ({id, imgFile, visible, price}) => {
                const formData = new FormData();

                if (imgFile) formData.append('imgFile', imgFile);
                if (visible) formData.append('visible', String(visible));
                if (price) formData.append('price', price);

                return {
                    url: `/products/${id}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg.id}],
        }),
    })
});

export const {
    useGetProductsQuery,
    useUpdateProductMutation
} = productsApi;