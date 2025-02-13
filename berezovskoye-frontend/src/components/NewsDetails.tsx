import React from 'react';
import {News} from "@/items/TestNews";
import Image from "next/image";

interface NewsDetailsProps {
    news : News;
}

export default function NewsDetails({ news }: NewsDetailsProps) {
    return (
        <div className="flex flex-col items-start justify-between gap-2 bg-white p-4">
            <h2 className="text-2xl">
                {news.title}
            </h2>

            <div className="relative aspect-[7/2] w-full select-none">
                <Image
                    src={news.imgUrl}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="News Image"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1">
                    <div className="text-base font-bold text-white">
                        {news.postingDate}
                    </div>
                </div>
            </div>

            <p className="text-base">
                {news.text}
            </p>
        </div>
    );
}