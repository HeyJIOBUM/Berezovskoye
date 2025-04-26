import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/database";
import {useAuth} from "@/lib/hooks";
import TextareaAutosize from "react-textarea-autosize";

interface ProductDetailsProps {
    product: Product;
    onSave: (product: Product, imgFile: File | null) => void;
}

export default function ProductDetails({product, onSave}: ProductDetailsProps) {
    const {isAuthenticated} = useAuth();

    const [isEditing, setIsEditing] = useState(false);

    const defaultProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        packagingTypes: product.packagingTypes,
        qualityIndicators: product.qualityIndicators,
        imgUrl: product.imgUrl,
        productDetailsTable: product.productDetailsTable,
        imgFile: null,
    };

    const [name, setName] = useState(defaultProduct.name);
    const [description, setDescription] = useState(defaultProduct.description);
    const [packagingTypes, setPackagingTypes] = useState<string[]>(defaultProduct.packagingTypes);
    const [qualityIndicators, setQualityIndicators] = useState<string[]>(defaultProduct.qualityIndicators);
    const [imgUrl, setImgUrl] = useState(defaultProduct.imgUrl);
    const [imgFile, setImgFile] = useState<File | null>(null);

    const onDownloadPrice = () => {
        console.log("download prices")
    }

    const onEditPhoto = () => {
        document.getElementById('fileInput')?.click();
    }

    const handleSave = () => {
        const updatedProduct = {...defaultProduct, name, description, packagingTypes, qualityIndicators, imgUrl};
        onSave(updatedProduct, imgFile);

        setIsEditing(false);
    }

    const handleCancel = () => {
        setName(defaultProduct.name);
        setDescription(defaultProduct.description);
        setQualityIndicators(defaultProduct.qualityIndicators)
        setPackagingTypes(defaultProduct.packagingTypes);
        setImgUrl(defaultProduct.imgUrl);
        setImgFile(null);

        setIsEditing(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
        }
    };

    return (
        <div className="flex flex-col gap-2 sm:gap-4">
            {
                isAuthenticated && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {isEditing
                            ?
                            <>
                                <button
                                    onClick={handleSave}
                                    className="base-button bg-buy"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="base-button bg-detail"
                                >
                                    Отменить
                                </button>
                            </>
                            :
                            <button
                                onClick={() => setIsEditing(true)}
                                className="base-button bg-detail"
                            >
                                Редактировать
                            </button>
                        }
                    </div>
                )
            }
            <div className="flex flex-col gap-2 sm:gap-4 md:flex-row">
                <div
                    className="flex h-fit min-w-[35%] flex-col items-center justify-start gap-1 bg-white p-1 sm:gap-4 sm:p-2.5">
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
                                    alt="News Image"
                                    className="select-none"
                                    unoptimized
                                />
                        }
                        {
                            isEditing &&
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
                <div className="flex w-full flex-col gap-2 break-words">
                    <div className="flex w-full flex-col gap-2 bg-white p-1 sm:p-2.5">
                        <div className="text-xl">
                            {isEditing ?
                                <TextareaAutosize
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border p-2 text-xl font-bold"
                                    minRows={1}
                                />
                                :
                                <p className="size-full break-words text-xl font-bold">
                                    {product.name}
                                </p>
                            }
                        </div>
                        <div className="text-base">
                            {isEditing ?
                                <TextareaAutosize
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border p-2 text-base"
                                    minRows={2}
                                />
                                :
                                <p className="size-full break-words text-base">
                                    {product.description}
                                </p>
                            }
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2 bg-white p-1 sm:p-2.5">
                        <div className="font-medium">
                            <div className="pb-2">
                                Возможны следующие виды упаковки
                            </div>
                            {isEditing ? (
                                <div className="flex flex-col gap-2">
                                    {packagingTypes.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const newPackagingTypes = [...packagingTypes];
                                                    newPackagingTypes[index] = e.target.value;
                                                    setPackagingTypes(newPackagingTypes);
                                                }}
                                                className="w-full border p-2 text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newPackagingTypes = packagingTypes.filter((_, i) => i !== index);
                                                    setPackagingTypes(newPackagingTypes);
                                                }}
                                                className="bg-red-500 p-2 text-white hover:bg-red-600"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="base-button bg-buy"
                                        onClick={() => setPackagingTypes([...packagingTypes, ""])}
                                    >
                                        Добавить упаковку
                                    </button>
                                </div>
                            ) : (
                                <ul className="list-disc pl-5 font-normal">
                                    {product.packagingTypes.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex-1 flex-col gap-2 bg-white p-1 sm:p-2.5">
                        <div className="font-medium">
                            <div className="pb-2">
                                Показатели качества
                            </div>
                            {isEditing ? (
                                <div className="flex flex-col gap-2">
                                    {qualityIndicators.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const newQualityIndicators = [...qualityIndicators];
                                                    newQualityIndicators[index] = e.target.value;
                                                    setQualityIndicators(newQualityIndicators);
                                                }}
                                                className="w-full border p-2 text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newQualityIndicators = qualityIndicators.filter((_, i) => i !== index);
                                                    setQualityIndicators(newQualityIndicators);
                                                }}
                                                className="bg-red-500 p-2 text-white hover:bg-red-600"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="base-button bg-buy"
                                        onClick={() => setQualityIndicators([...qualityIndicators, ""])}
                                    >
                                        Добавить показатель
                                    </button>
                                </div>
                            ) : (
                                <ul className="list-disc pl-5 font-normal">
                                    {product.qualityIndicators.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
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