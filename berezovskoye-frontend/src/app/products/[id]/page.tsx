"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import React, {use} from "react";
import {useGetProductsQuery} from "@/lib/api/productsApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {notFound} from "next/navigation";
import {useAuth} from "@/lib/hooks";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);

    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();
    const {isAuthenticated} = useAuth();

    if (productsError) throw productsError;

    const product = products?.find((product) => product.id == id);

    if (!isProductsLoading) {
        if (!product) notFound();
        if (product && !product.visible && !isAuthenticated) notFound();
    }

    return (
        <div className="base-container">
            <TextWithLines text={"Подробнее о товаре"}/>
            {
                isProductsLoading ?
                    <LoadingSpinner/>
                    :
                    product &&
                    <ProductDetails
                        product={product}
                        isAuthenticated={isAuthenticated}
                    />
            }
        </div>
    );
}