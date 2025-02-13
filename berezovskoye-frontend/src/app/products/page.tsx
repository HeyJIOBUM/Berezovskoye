"use client"

import {Product, TestProducts} from "@/items/TestProducts";
import Image from "next/image";
import TextWithLines from "@/components/TextWithLines";
import ProductCard from "@/components/ProductCard";

export default function Page() {
    const products = TestProducts();

    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-28 w-full select-none">
                <Image
                    src="/banner.png"
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="Banner Image"
                />
            </div>
            <div className="w-full max-w-screen-lg py-4">
                <div className="flex flex-col gap-4">
                    <TextWithLines text={"Все товары"}/>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product: Product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}