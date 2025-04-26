"use client";

import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import React, {use} from "react";
import {useGetProductsQuery, useUpdateProductImageMutation} from "@/lib/api/productsApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import {notFound} from "next/navigation";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: ProductPageProps) {
    const {id} = use(params);
    const productId = +id;

    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();
    const [updateProductImage] = useUpdateProductImageMutation();

    if (productsError) throw productsError;

    const product = products?.find((product) => product.id == id);

    if (!isProductsLoading && !product) notFound();

    const onSave = (imgFile: File) => {
        updateProductImage({id: productId, imgFile: imgFile});
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