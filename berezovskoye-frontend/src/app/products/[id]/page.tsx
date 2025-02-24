"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import {useGetProductByIdQuery} from "@/lib/api/productsApi";
import {use} from "react";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);
    const productId = +id;
    const {data: product, error: productError, isLoading: isProductsLoading} = useGetProductByIdQuery({id: productId});

    if (productError) return <div>Error</div>;

    return (
        <div className="base-container">
            <TextWithLines text={"Подробнее о товаре"}/>
            {
                isProductsLoading || !product ?
                    <div>
                        Loading...
                    </div>
                    :
                    <ProductDetails product={product}/>
            }
        </div>
    );
}