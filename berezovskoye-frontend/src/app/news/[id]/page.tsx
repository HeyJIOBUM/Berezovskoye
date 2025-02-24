"use client"

import {use} from "react";
import TextWithLines from "@/components/TextWithLines";
import NewsDetails from "@/components/NewsDetails";
import {useGetNewsByIdQuery} from "@/lib/api/newsApi";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: NewsPageProps) {
    const {id} = use(params);
    const newsId = +id;
    const {data: news, error: newsError, isLoading: isNewsLoading} = useGetNewsByIdQuery({id: newsId});

    if (newsError) return <div>Error</div>;

    return (
        <div className="base-container">
            <TextWithLines text={"Новости подробнее"}/>
            {
                isNewsLoading || !news ?
                    <div>
                        Loading...
                    </div>
                    :
                    <NewsDetails news={news}/>
            }
        </div>
    );
}