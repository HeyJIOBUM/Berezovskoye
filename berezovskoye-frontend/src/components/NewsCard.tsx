"use client"

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {News} from "@/database";

interface NewsCardProps {
    news: News;
}

export default function NewsCard({news}: NewsCardProps) {
    return (
        <div className="flex flex-col items-start justify-between gap-2 bg-white p-1 sm:p-2.5">
            <div className="relative aspect-[7/3] w-full select-none">
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

            <div className="w-full">
                <h2 className="text-xl">
                    {news.title}
                </h2>

                <p className="line-clamp-3 text-base">
                    {news.text}
                </p>
            </div>

            <Link
                className="base-button bg-detail"
                href={`/news/${news.id}`}
            >
                Читать подробнее
            </Link>

        </div>
    );
}