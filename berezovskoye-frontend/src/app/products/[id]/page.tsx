"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import React, {use} from "react";
import {useGetProductsQuery, useUpdateProductImageMutation} from "@/lib/api/productsApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {notFound} from "next/navigation";
import {Product} from "@/database";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);
    const productId = +id;

    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();
    const [updateProductImage] = useUpdateProductImageMutation();

    if (productsError) throw productsError;

    const product = products?.find((product) => product.id == productId);

    if (!isProductsLoading && !product) notFound();

    const onSave = (product: Product, imgFile: File | null) => {
        updateProductImage({id: productId, product: product, imgFile: imgFile});
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
                        onSave={onSave}
                    />
            }
        </div>
    );
}