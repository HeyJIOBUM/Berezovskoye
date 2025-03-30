"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import React, {use} from "react";
import {useGetProductsQuery} from "@/lib/api/productsApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {notFound} from "next/navigation";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);
    const productId = +id;
    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();

    if (productsError) throw productsError;

    const product = products?.find((product) => product.id == productId);

    if (!isProductsLoading && !product) notFound();

    return (
        <div className="base-container">
            <TextWithLines text={"Подробнее о товаре"}/>
            {
                isProductsLoading ?
                    <LoadingSpinner/>
                    :
                    product &&
                    <ProductDetails product={product}/>
            }
        </div>
    );
}