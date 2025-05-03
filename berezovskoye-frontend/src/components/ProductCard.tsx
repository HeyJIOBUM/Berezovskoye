"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";
import {useUpdateProductMutation} from "@/lib/api/productsApi";
import {getImageUrl} from "@/lib/images";

interface ProductCardProps {
    product: Product;
    isAuthenticated: boolean;
}

export default function ProductCard({product, isAuthenticated}: ProductCardProps) {
    const [updateProduct] = useUpdateProductMutation();

    const onToggleVisible = () => {
        updateProduct({id: product.id, existingProduct: product, visible: !product.visible});
    };

    return (
        <div className={`flex flex-col gap-1 bg-white p-1 sm:gap-2.5 sm:p-2.5 ${
            !product.visible ? "opacity-75" : ""
        }`}>
            <div className="relative aspect-[1] w-full select-none bg-gray-300">
                <Image
                    src={getImageUrl(product.imgUrl)}
                    fill={true}
                    style={{objectFit: "contain"}}
                    alt="Product Image"
                    unoptimized
                />
            </div>
            <div className="flex size-full flex-col justify-between gap-1 break-words">
                <p className="line-clamp-3 text-base font-medium">
                    {product.name}
                </p>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={"/wallet.svg"}
                            width={13.4}
                            height={14}
                            alt={""}
                            className={"select-none"}
                        />
                        {`${product.price} руб.`}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={"/package.svg"}
                            width={14}
                            height={14}
                            alt={""}
                            className={"select-none"}
                        />
                        {product.packagingType}
                    </div>
                </div>
            </div>
            <div className={`flex w-full flex-wrap justify-between gap-1 sm:gap-2 ${
                isAuthenticated ? "flex-col" : ""
            }`}>
                {
                    isAuthenticated
                        ?
                        <>
                            <button
                                className="base-button bg-buy"
                                onClick={onToggleVisible}
                            >
                                {product.visible ? "Скрыть" : "Показать"}
                            </button>
                            <Link
                                className="base-button bg-detail"
                                href={`/products/${product.id}`}
                            >
                                Редактировать
                            </Link>
                        </>
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