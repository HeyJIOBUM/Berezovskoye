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
        <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex h-fit min-w-[35%] flex-col items-center justify-start gap-4 bg-white p-2.5">
                    <div className="relative flex aspect-[1] w-full select-none">
                        <Image
                            src={product.imgUrl}
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="Product Image"
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2 text-sm">
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
                    <div className="flex w-full flex-col gap-2 bg-white p-2.5">
                        <div className="text-xl">
                            {product.name}
                        </div>
                        <div className="text-base">
                            {product.description}
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2 bg-white p-2.5">
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
                    <div className="w-full flex-1 flex-col gap-2 bg-white p-2.5">
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
            <table className="w-full table-fixed border-collapse bg-white">
                <thead className="bg-table-header text-left text-base font-bold">
                    <tr>
                        {product.productDetailsTable.header.map((item, index) => (
                            <th key={index} className={(index === 0 ? "w-2/5" : "") + " p-2.5"}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {product.productDetailsTable.categories.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                            <tr className="font-semibold">
                                <td className="p-2.5">
                                    {category.categoryName}
                                </td>
                            </tr>
                            {category.categoryDetails.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={cellIndex === 0 ? "ml-8 list-item list-disc pr-2.5" : "px-2.5"}
                                            style={{
                                                paddingBottom: rowIndex === category.categoryDetails.length - 1 ? "0.625rem" : "",
                                            }}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}