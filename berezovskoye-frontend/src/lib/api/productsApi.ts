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
            existingProduct?: Product,
            imgFile?: File,
            price?: File
        }>({
            query: ({id, existingProduct, imgFile, price}) => {
                const formData = new FormData();

                const product = existingProduct ? {
                    visible: !existingProduct.visible,
                    name: existingProduct.name,
                    imgUrl: existingProduct.imgUrl,
                    priceUrl: existingProduct.priceUrl,
                } : {
                    visible: false,
                    name: null,
                    imgUrl: null,
                    priceUrl: null,
                };

                if (imgFile) formData.append('imgFile', imgFile);
                if (price) formData.append('price', price);

                formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
                //if (visible) formData.append('visible', String(visible));

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