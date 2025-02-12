"use client"

import React from 'react';
import {Product} from "@/items/TestProducts";
import Image from "next/image";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const onBuy = () => {
        console.log("покупаем");
    }

    const onDownloadPrice = () => {
        console.log("качаем");
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-6">
                    <div className="flex flex-col items-start justify-between gap-4 bg-white p-4">
                        <div className="relative aspect-[1] w-full select-none">
                            <Image
                                src={product.imgUrl}
                                fill={true}
                                style={{objectFit: "contain"}}
                                alt="Product Image"
                            />
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <button
                                className="w-full flex-1 bg-buy p-2 font-bold text-white"
                                onClick={onBuy}
                            >
                                Купить
                            </button>
                            <button
                                className="w-full flex-1 bg-detail p-2 font-bold text-white"
                                onClick={onDownloadPrice}
                            >
                                Скачать прайс-лист
                            </button>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full flex-col gap-2 bg-white p-2">
                            <div className="text-2xl">
                                {product.name}
                            </div>
                            <div className="text-base">
                                {product.description}
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 bg-white p-2">
                            <div className="font-medium">
                                <div className="pb-2">
                                    Возможны следующие виды упаковки
                                </div>
                                <ul className="list-disc pl-5 font-normal">
                                    {product.packagingTypes.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 bg-white p-2">
                            <div className="font-medium">
                                <div className="pb-2">
                                    Показатели качества
                                </div>
                                <ul className="list-disc pl-5 font-normal">
                                    {product.qualityIndicators.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="bg-white">
                    <thead>
                        <tr>
                            {product.productDetailsTable.header.map((item, index) => (
                                <th key={index}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {product.productDetailsTable.categories.map((category, categoryIndex) => (
                            <>
                                <tr key={categoryIndex * 1000}>
                                    <td colSpan={product.productDetailsTable.header.length}>
                                        {category.categoryName}
                                    </td>
                                </tr>
                                {category.categoryDetails.map((row, rowIndex) => (
                                    <tr key={categoryIndex * 1000 + rowIndex * 100 + 1}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={categoryIndex * 1000 + rowIndex * 100 + cellIndex + 2}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}