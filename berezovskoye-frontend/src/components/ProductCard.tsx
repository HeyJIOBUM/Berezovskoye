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
            <div className="relative aspect-[1] w-full select-none">
                <Image
                    src={product.imgUrl}
                    fill={true}
                    style={{objectFit: "contain"}}
                    alt="Product Image"
                />
            </div>
            <div>
                <div className="text-base font-medium">{product.name}</div>
                <p className="text-sm font-light">{product.description}</p>
            </div>
            <div className="flex w-full flex-wrap justify-between gap-1 text-center text-sm sm:gap-2">
                <Link
                    className="flex-1 bg-detail py-2 font-bold text-white"
                    href={`/products/${product.id}`}
                >
                    Подробнее
                </Link>
                <Link
                    className="flex-1 bg-buy py-2 font-bold text-white"
                    href={`/feedback`}
                >
                    Купить
                </Link>
            </div>
        </div>
    );
}