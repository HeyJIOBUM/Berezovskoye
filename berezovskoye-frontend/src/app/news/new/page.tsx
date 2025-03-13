"use client"

import NewsDetails from "@/components/NewsDetails";
import {News} from "@/database";
import {useAuth} from "@/lib/hooks";
import TextWithLines from "@/components/TextWithLines";
import {redirect} from "next/navigation";

export default function Page() {
    const {isAuthenticated, isLoading} = useAuth();

    if (!isLoading && !isAuthenticated) {
        redirect('/news');
    }

    const onSave = (news: News) => {
        console.log(news);
    }

    return (
        <div className="base-container">
            <TextWithLines text="Создание новости"/>
            <NewsDetails
                news={null}
                onSave={onSave}
            />
        </div>
    );
}