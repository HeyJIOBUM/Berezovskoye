"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";

interface ProductCardProps {
    product: Product;
    isAuthenticated: boolean;
}

export default function ProductCard({product, isAuthenticated}: ProductCardProps) {
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
            <div className="size-full break-words">
                <p className="text-base font-medium">
                    {product.name}
                </p>
                <p className="line-clamp-3 text-sm font-light">
                    {product.description}
                </p>
            </div>
            <div className="flex w-full flex-wrap justify-between gap-1 sm:gap-2">
                {
                    isAuthenticated
                        ?
                        <Link
                            className="base-button bg-detail"
                            href={`/products/${product.id}`}
                        >
                            Редактировать
                        </Link>
                        :
                        <>
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
                        </>
                }
            </div>
        </div>
    );
}