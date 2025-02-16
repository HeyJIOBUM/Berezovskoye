"use client"

import React from 'react';
import {Product} from "@/items/TestProducts";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <div className="flex flex-col gap-1 bg-white p-1 sm:gap-2.5 sm:p-2.5">
            <div className="relative aspect-[1] w-full select-none bg-gray-300">
                <Image
                    src={product.imgUrl}
                    fill={true}
                    style={{objectFit: "contain"}}
                    alt="Product Image"
                />
            </div>
            <div className="h-full">
                <p className="text-base font-medium">
                    {product.name}
                </p>
                <p className="line-clamp-3 text-sm font-light">
                    {product.description}
                </p>
            </div>
            <div className="flex w-full flex-wrap justify-between gap-1 sm:gap-2">
                <Link
                    className="base-button bg-detail"
                    href={`/products/${product.id}`}
                >
                    Подробнее
                </Link>
                <Link
                    className="base-button bg-buy"
                    href="/feedback"
                >
                    Купить
                </Link>
            </div>
        </div>
    );
}