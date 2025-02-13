import TextWithLines from "@/components/TextWithLines";
import React from "react";
import {News, TestNews} from "@/items/TestNews";
import NewsCard from "@/components/NewsCard";

export default function Page() {
    const allNews = TestNews();

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text={"Новости"}/>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {allNews.map((news: News) => (
                    <NewsCard
                        key={news.id}
                        news={news}
                    />
                ))}
            </div>
        </div>
    );
}