"use client"

import NewsDetails from "@/components/NewsDetails";
import {News} from "@/database";
import {useAuth} from "@/lib/hooks";
import TextWithLines from "@/components/TextWithLines";
import {redirect, RedirectType} from "next/navigation";
import {useAddNewsMutation} from "@/lib/api/newsApi";

export default function Page() {
    const {isAuthenticated, isLoading} = useAuth();

    if (!isLoading && !isAuthenticated) {
        redirect('/news');
    }

    const [addNews] = useAddNewsMutation();

    const onSave = (news: News, imgFile: File | null) => {
        addNews({news: news, imgFile: imgFile});
    }

    const onCancel = () => {
        redirect('/news', RedirectType.push);
    }

    return (
        <div className="base-container">
            <TextWithLines text="Создание новости"/>
            <NewsDetails
                onSave={onSave}
                onCancel={onCancel}
                isEditing={true}
            />
        </div>
    );
}