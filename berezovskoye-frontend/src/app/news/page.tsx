import TextWithLines from "@/components/TextWithLines";
import React from "react";
import {News, TestNews} from "@/items/TestNews";
import NewsCard from "@/components/NewsCard";

export default function Page() {
    const allNews = TestNews();

    return (
        <div className="base-container">
            <TextWithLines text={"Новости"}/>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
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