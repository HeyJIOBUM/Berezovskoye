import TextWithLines from "@/components/TextWithLines";
import {TestNews} from "@/items/TestNews";
import NewsDetails from "@/components/NewsDetails";

interface NewsPageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params } : NewsPageProps) {
    const newsId = (await params).id;
    const news = TestNews()[+newsId-1];

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text={"Новости подробнее"}/>
            <NewsDetails news={news}/>
        </div>
    );
}