"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import {use} from "react";
import {useGetProductsQuery} from "@/lib/api/productsApi";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);
    const productId = +id;
    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();

    if (productsError) return <div>Error</div>;

    const product = products?.find((product) => product.id == productId);

    return (
        <div className="base-container">
            <TextWithLines text={"Подробнее о товаре"}/>
            {
                isProductsLoading ?
                    <div>
                        Loading...
                    </div>
                    :
                    product ?
                        <ProductDetails product={product}/>
                        :
                        <div>
                            Not found
                        </div>
            }
        </div>
    );
}