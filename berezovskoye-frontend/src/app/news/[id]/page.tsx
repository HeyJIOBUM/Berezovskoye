"use client"

import React, {use} from "react";
import TextWithLines from "@/components/TextWithLines";
import NewsDetails from "@/components/NewsDetails";
import {useGetNewsQuery, useUpdateNewsMutation} from "@/lib/api/newsApi";
import {News} from "@/database";
import LoadingSpinner from "@/components/LoadingSpinner";
import {notFound} from "next/navigation";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default function Page({params}: NewsPageProps) {
    const {id} = use(params);
    const newsId = +id;

    const {data: allNews, error: newsError, isLoading: isNewsLoading} = useGetNewsQuery();
    const [updateNews] = useUpdateNewsMutation();

    if (newsError) throw newsError;

    const news = allNews?.find((news) => news.id == newsId);

    if (!isNewsLoading && !news) notFound();

    const onSave = (news: News, imgFile: File | null) => {
        updateNews({id: newsId, news: news, imgFile: imgFile});
    }

    return (
        <div className="base-container">
            <TextWithLines text={"Новости подробнее"}/>
            {
                isNewsLoading ?
                    <LoadingSpinner/>
                    :
                    <NewsDetails
                        news={news}
                        onSave={onSave}
                        isEditing={false}
                    />
            }
        </div>
    );
}