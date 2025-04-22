"use client"

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {News} from "@/database";
import {useDeleteNewsMutation} from "@/lib/api/newsApi";

interface NewsCardProps {
    news: News;
    isAuthenticated: boolean;
}

export default function NewsCard({news, isAuthenticated}: NewsCardProps) {
    const [deleteNews] = useDeleteNewsMutation();

    const onDeleteNews = () => {
        deleteNews({id: news.id});
    }

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

            <div className="size-full break-words">
                <h2 className="text-xl">
                    {news.title}
                </h2>

                <p className="line-clamp-3 text-base">
                    {news.text}
                </p>
            </div>
            {
                isAuthenticated
                    ?
                    <div className="flex w-full flex-wrap justify-between gap-1 sm:gap-2">
                        <Link
                            className="base-button bg-detail"
                            href={`/news/${news.id}`}
                        >
                            Редактировать
                        </Link>
                        <button
                            className="base-button bg-delete"
                            onClick={onDeleteNews}
                        >
                            Удалить
                        </button>
                    </div>
                    :
                    <Link
                        className="base-button bg-detail"
                        href={`/news/${news.id}`}
                    >
                        Читать подробнее
                    </Link>
            }
        </div>
    );
}