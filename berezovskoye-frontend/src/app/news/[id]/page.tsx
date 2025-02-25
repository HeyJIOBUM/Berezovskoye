"use client"

import {use} from "react";
import TextWithLines from "@/components/TextWithLines";
import NewsDetails from "@/components/NewsDetails";
import {useGetNewsQuery} from "@/lib/api/newsApi";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: NewsPageProps) {
    const {id} = use(params);
    const newsId = +id;
    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();

    if (newsError) return <div>Error</div>;

    const news = allNews?.find((news) => news.id == newsId);

    return (
        <div className="base-container">
            <TextWithLines text={"Новости подробнее"}/>
            {
                isNewsLoading ?
                    <div>
                        Loading...
                    </div>
                    :
                    news ?
                        <NewsDetails news={news}/>
                        :
                        <div>
                            Not found
                        </div>
            }
        </div>
    );
}