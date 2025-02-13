"use client"

import React from 'react';
import {Product} from "@/items/TestProducts";
import Image from "next/image";
import {redirect} from "next/navigation";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    const onDetailsOpen = () => {
        redirect(`/products/${product.id}`);
    }

    const onBuy = () => {
        console.log("покупаем");
    }

    return (
        <div className="flex flex-col items-start justify-between gap-4 bg-white p-2.5">
            <div className="relative aspect-[1] w-full select-none">
                <Image
                    src={product.imgUrl}
                    fill={true}
                    style={{objectFit: "contain"}}
                    alt="Product Image"
                />
            </div>
            <div>
                <div className="mb-2 text-lg font-medium">{product.name}</div>
                <p className="text-base">{product.description}</p>
            </div>
            <div className="flex w-full justify-between gap-2 text-sm">
                <button className="flex-1 bg-detail p-2 font-bold text-white" onClick={onDetailsOpen}>
                    Подробнее
                </button>
                <button className="flex-1 bg-buy p-2 font-bold text-white" onClick={onBuy}>
                    Купить
                </button>
            </div>
        </div>
    );
}