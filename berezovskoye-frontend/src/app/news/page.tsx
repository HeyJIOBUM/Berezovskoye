"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";
import NewsCard from "@/components/NewsCard";
import {useGetNewsQuery} from "@/lib/api/newsApi";
import {News} from "@/database";
import {useAuth} from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();
    const {isAuthenticated} = useAuth();

    if (newsError) throw newsError;

    return (
        <div className="base-container">
            <TextWithLines text={"Новости"}/>
            {
                isNewsLoading ?
                    <LoadingSpinner/>
                    :
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
                        {
                            isAuthenticated &&
                            <Link
                                className="flex select-none items-center justify-center bg-white"
                                href={"/news/new"}
                            >
                                <Image
                                    width={190}
                                    height={190}
                                    src={"/add.svg"}
                                    alt={"Добавить"}
                                />
                            </Link>
                        }
                        {allNews?.map((news: News) => (
                            <NewsCard
                                key={news.id}
                                news={news}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
            }
        </div>
    );
}