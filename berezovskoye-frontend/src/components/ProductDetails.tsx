"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";
import {useAuth} from "@/lib/hooks";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({product}: ProductDetailsProps) {
    const {isAuthenticated} = useAuth();

    const onDownloadPrice = () => {
        console.log("download prices")
    }

    const onEditPhoto = () => {
        console.log("edit photo")
    }

    return (
        <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-4 md:flex-row">
                <div
                    className="flex h-fit min-w-[35%] flex-col items-center justify-start gap-1 bg-white p-1 sm:gap-4 sm:p-2.5">
                    <div className="relative flex aspect-[1] w-full select-none bg-gray-300">
                        <Image
                            src={product.imgUrl}
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="Product Image"
                        />
                        {
                            isAuthenticated &&
                            <button
                                onClick={onEditPhoto}
                                className="absolute right-2 top-2 p-4">
                                <Image
                                    src="/edit.svg"
                                    alt="изменить"
                                    fill={true}
                                />
                            </button>
                        }
                    </div>
                    <div className="flex w-full flex-col gap-1 text-sm sm:gap-2">
                        <Link
                            className="base-button bg-buy"
                            href="/feedback"
                        >
                            Купить
                        </Link>
                        <button
                            className="base-button bg-detail"
                            onClick={onDownloadPrice}
                        >
                            Скачать прайс-лист
                        </button>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 break-words">
                    <div className="flex w-full flex-col gap-2 bg-white p-1 sm:p-2.5">
                        <div className="text-xl">
                            {product.name}
                        </div>
                        <div className="text-base">
                            {product.description}
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2 bg-white p-1 sm:p-2.5">
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
                    <div className="w-full flex-1 flex-col gap-2 bg-white p-1 sm:p-2.5">
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
            <table className="scrollbar-hidden block table-fixed border-collapse overflow-x-auto bg-white">
                <thead className="bg-table-header text-left text-base font-bold">
                <tr>
                    {product.productDetailsTable.header.map((item, index) => (
                        <th
                            key={index}
                            className="p-1 sm:p-2.5"
                            style={{
                                width: index === 0 ? "40%" : `${60 / (product.productDetailsTable.header.length - 1)}%`,
                            }}
                        >
                            {item}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="text-sm">
                {product.productDetailsTable.categories.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                        <tr className="font-semibold">
                            <td className="p-1 sm:p-2.5">
                                {category.categoryName}
                            </td>
                        </tr>
                        {category.categoryDetails.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`${cellIndex === 0 ? "ml-8 list-item list-disc pr-1 sm:pr-2.5" : "p-1 sm:px-2.5"}`}
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