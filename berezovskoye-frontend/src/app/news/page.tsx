"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";
import NewsCard from "@/components/NewsCard";
import {useGetNewsQuery} from "@/lib/api/newsApi";
import {News} from "@/database";

export default function Page() {
    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();

    if (newsError) return <div>Error</div>

    return (
        <div className="base-container">
            <TextWithLines text={"Новости"}/>
            {
                isNewsLoading ?
                    <div>
                        Loading...
                    </div>
                    :
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
                        {allNews?.map((news: News) => (
                            <NewsCard
                                key={news.id}
                                news={news}
                            />
                        ))}
                    </div>
            }
        </div>
    );
}