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
            existingProduct: Product,
            imgFile?: File,
            price?: File,
            visible?: boolean,
        }>({
            query: ({id, existingProduct, imgFile, price, visible}) => {
                const formData = new FormData();

                const product = {
                    imgUrl: existingProduct.imgUrl,
                    priceUrl: existingProduct.priceUrl,
                    visible: visible || false,
                }

                if (imgFile) formData.append('imgFile', imgFile);
                if (price) formData.append('price', price);

                formData.append('product', new Blob([JSON.stringify(product)], {type: 'application/json'}));

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