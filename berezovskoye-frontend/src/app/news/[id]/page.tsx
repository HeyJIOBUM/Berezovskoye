"use client"

import {use} from "react";
import TextWithLines from "@/components/TextWithLines";
import NewsDetails from "@/components/NewsDetails";
import {useGetNewsQuery} from "@/lib/api/newsApi";
import {News} from "@/database";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: NewsPageProps) {
    const {id} = use(params);
    const newsId = +id;
    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();

    if (newsError) return <div>Error</div>;

    const news = allNews?.find((news) => news.id == newsId);

    const onSave = (news: News) => {
        console.log("save news:", news);
    }

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
                        <NewsDetails
                            news={news}
                            onSave={onSave}
                        />
                        :
                        <div>
                            Not found
                        </div>
            }
        </div>
    );
}