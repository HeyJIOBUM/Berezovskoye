import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";
import {useAuth} from "@/lib/hooks";

interface ProductDetailsProps {
    product: Product;
    onSave: (imgFile: File) => void;
}

export default function ProductDetails({product, onSave}: ProductDetailsProps) {
    const {isAuthenticated} = useAuth();

    const [imgFile, setImgFile] = useState<File | null>(null);

    const onDownloadPrice = () => {
        console.log("download prices")
    }

    const onEditPhoto = () => {
        document.getElementById('fileInput')?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            onSave(file);
        }
    };

    return (
        <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-4 md:flex-row">
                <div className="flex min-w-[35%] flex-col gap-1 sm:gap-2">
                    <div className="flex w-full flex-col gap-1 bg-white p-1 sm:gap-4 sm:p-2.5">
                        <div className="relative flex aspect-[1] w-full select-none bg-gray-300">
                            {
                                imgFile == null ?
                                    <Image
                                        src={product.imgUrl}
                                        fill={true}
                                        style={{objectFit: "cover"}}
                                        alt="Product Image"
                                        className="select-none"
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
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </>
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
                    <div className="bg-white p-1 sm:p-2.5">
                        <p className="text-base font-medium">
                            <span className="font-semibold">Тип упаковки:</span> {product.packagingTypes}
                        </p>
                    </div>
                    <div className="bg-white p-1 sm:p-2.5">
                        <p className="text-base font-medium">
                            <span className="font-semibold">Цена:</span> {`${product.price} руб.`}
                        </p>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 break-words">
                    <div className="text-lg bg-white p-1 sm:p-2.5">
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