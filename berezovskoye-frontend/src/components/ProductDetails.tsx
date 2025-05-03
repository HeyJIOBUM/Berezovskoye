import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";
import {useUpdateProductMutation} from "@/lib/api/productsApi";
import {getImageUrl} from "@/lib/images";
import {getXlsUrl} from "@/lib/xls";

interface ProductDetailsProps {
    product: Product;
    isAuthenticated: boolean;
}

export default function ProductDetails({product, isAuthenticated}: ProductDetailsProps) {
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [updateProduct] = useUpdateProductMutation();

    const onToggleVisible = () => {
        updateProduct({id: product.id, existingProduct: product, visible: !product.visible});
    };

    const onDownloadPrice = () => {
        if (!product.priceUrl)
            return;
        const link = document.createElement('a');
        link.href = getXlsUrl(product.priceUrl);
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const onEditPrice = () => {
        document.getElementById('priceInput')?.click();
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log(product);
            updateProduct({id: product.id, existingProduct: product, price: file});
        }
    };

    const onEditPhoto = () => {
        document.getElementById('photoInput')?.click();
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            updateProduct({id: product.id, existingProduct: product, imgFile: file});
        }
    };

    return (
        <div className={`flex flex-col gap-2 sm:gap-4 ${
            !product.visible ? "opacity-75" : ""
        }`}>
            <div className="flex flex-col gap-2 sm:gap-4 md:flex-row">
                <div className="flex min-w-[35%] flex-col gap-1 sm:gap-2">
                    <div className="flex w-full flex-col gap-1 bg-white p-1 sm:gap-4 sm:p-2.5">
                        <div className="relative flex aspect-[1] w-full select-none bg-gray-300">
                            {
                                imgFile == null ?
                                    <Image
                                        src={getImageUrl(product.imgUrl)}
                                        fill={true}
                                        style={{objectFit: "cover"}}
                                        alt="Product Image"
                                        className="select-none"
                                        unoptimized
                                    />
                                    :
                                    <Image
                                        src={URL.createObjectURL(imgFile)}
                                        fill={true}
                                        style={{objectFit: "cover"}}
                                        alt="Product Image"
                                        className="select-none"
                                        unoptimized
                                    />
                            }
                            {
                                isAuthenticated &&
                                <>
                                    <button
                                        onClick={onEditPhoto}
                                        className="absolute right-2 top-2 p-4">
                                        <Image
                                            src="/edit.svg"
                                            alt="изменить"
                                            fill={true}
                                        />
                                    </button>
                                    <input
                                        id="photoInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </>
                            }
                        </div>
                        <div className="flex w-full flex-col gap-1 text-sm sm:gap-2">
                            {
                                isAuthenticated ?
                                    <>
                                        <button
                                            className="base-button bg-buy"
                                            onClick={onToggleVisible}
                                        >
                                            {product.visible ? "Скрыть" : "Показать"}
                                        </button>
                                        <button
                                            className="base-button bg-detail"
                                            onClick={onEditPrice}
                                        >
                                            Загрузить прайс-лист
                                        </button>
                                        <input
                                            id="priceInput"
                                            type="file"
                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            onChange={handlePriceChange}
                                            className="hidden"
                                        />
                                    </>
                                    :
                                    <>
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
                                    </>
                            }
                        </div>
                    </div>
                    <div className="bg-white p-1 sm:p-2.5">
                        <p className="text-base font-medium">
                            <span className="font-semibold">Тип упаковки:</span> {product.packagingType}
                        </p>
                    </div>
                    <div className="bg-white p-1 sm:p-2.5">
                        <p className="text-base font-medium">
                            <span className="font-semibold">Цена:</span> {`${product.price} руб.`}
                        </p>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 break-words">
                    <div className="bg-white p-1 text-lg sm:p-2.5">
                        <span className="font-semibold">Наименование:</span> {product.name}
                    </div>
                    <div className="bg-white p-1 sm:p-2.5">
                        <div className="text-lg">
                            <span className="font-semibold">
                                Описание:
                            </span>
                        </div>
                        <div className="text-sm">
                            {product.description.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}