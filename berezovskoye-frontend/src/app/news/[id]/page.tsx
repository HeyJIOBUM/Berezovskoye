"use client"

import React, {use} from "react";
import TextWithLines from "@/components/TextWithLines";
import NewsDetails from "@/components/NewsDetails";
import {useGetNewsQuery, useUpdateNewsMutation} from "@/lib/api/newsApi";
import {News} from "@/database";
import LoadingSpinner from "@/components/LoadingSpinner";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: NewsPageProps) {
    const {id} = use(params);
    const newsId = +id;

    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();
    const [updateNews] = useUpdateNewsMutation();

    if (newsError) return <div>Error</div>;

    const news = allNews?.find((news) => news.id == newsId);

    const onSave = (news: News) => {
        updateNews({id: newsId, news: news});
    }

    return (
        <div className="base-container">
            <TextWithLines text={"Новости подробнее"}/>
            {
                isNewsLoading ?
                    <LoadingSpinner/>
                    :
                    news ?
                        <NewsDetails
                            news={news}
                            onSave={onSave}
                            isEditing={false}
                        />
                        :
                        <div>
                            Not found
                        </div>
            }
        </div>
    );
}