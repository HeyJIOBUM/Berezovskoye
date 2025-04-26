"use client"

import Image from "next/image";
import TextWithLines from "@/components/TextWithLines";
import ProductCard from "@/components/ProductCard";
import {useGetProductsQuery} from "@/lib/api/productsApi";
import {Product} from "@/database";
import {useAuth} from "@/lib/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

export default function Page() {
    const {data: products, error: productsError, isLoading: isProductsLoading} = useGetProductsQuery();
    const {isAuthenticated} = useAuth();

    if (productsError) throw productsError;

    const filteredProducts = products?.filter(el => isAuthenticated || el.visible);

    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-28 w-full select-none">
                <Image
                    src="/banner.png"
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="Banner Image"
                />
            </div>
            <div className="base-container h-full">
                <TextWithLines text={"Все товары"}/>
                {
                    isProductsLoading ?
                        <LoadingSpinner/>
                        :
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts?.map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isAuthenticated={isAuthenticated}
                                />
                            ))}
                        </div>
                }
            </div>
        </div>
    );
}