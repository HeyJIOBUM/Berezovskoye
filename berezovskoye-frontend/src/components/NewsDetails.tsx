import React, {useState} from 'react';
import Image from "next/image";
import {News} from "@/database";
import {useAuth} from "@/lib/hooks";
import TextareaAutosize from "react-textarea-autosize";
import {getImageUrl} from "@/lib/images";

// from dd.mm.yyyy to yyyy-mm-dd
export const convertFromDisplayToDateInputFormat = (date: string) => {
    const [day, month, year] = date.split('.');
    return `${year}-${month}-${day}`;
};

// from yyyy-mm-dd to dd.mm.yyyy
export const convertFromDateInputToDisplayFormat = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
};

interface NewsDetailsProps {
    news?: News;
    onCancel?: () => void;
    onSave: (news: News, imgFile: File | null) => void;
    isEditing: boolean;
}

export default function NewsDetails({news, onSave, onCancel, isEditing: initialEditingState}: NewsDetailsProps) {
    const {isAuthenticated} = useAuth();

    const [isEditing, setIsEditing] = useState(initialEditingState);

    const todayInDateInputFormat = new Date().toISOString().slice(0, 10);
    const defaultNews = {
        id: news?.id || -1,
        title: news?.title || "Пример заголовка",
        text: news?.text || "Пример текста",
        postingDate: news?.postingDate || convertFromDateInputToDisplayFormat(todayInDateInputFormat),
        imgUrl: news?.imgUrl || "/placeholder.svg",
        imgFile: null,
    };

    const [title, setTitle] = useState(defaultNews.title);
    const [text, setText] = useState(defaultNews.text);
    const [postingDate, setPostingDate] = useState(defaultNews.postingDate);
    const [imgUrl, setImgUrl] = useState(defaultNews.imgUrl);
    const [imgFile, setImgFile] = useState<File | null>(null);

    const handleSave = () => {
        const updatedNews = {...defaultNews, title, text, imgUrl, imgFile, postingDate};
        onSave(updatedNews, imgFile);

        setIsEditing(false);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }

        setTitle(defaultNews.title);
        setText(defaultNews.text);
        setPostingDate(defaultNews.postingDate);
        setImgUrl(defaultNews.imgUrl);
        setImgFile(null);

        setIsEditing(false);
    }

    const onEditPhoto = () => {
        document.getElementById('fileInput')?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
        }
    };

    return (
        <div className="flex flex-col items-start justify-between gap-2 bg-white p-1 sm:p-2.5">
            {
                isAuthenticated && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {isEditing
                            ?
                            <>
                                <button
                                    onClick={handleSave}
                                    className="base-button bg-buy"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="base-button bg-detail"
                                >
                                    Отменить
                                </button>
                            </>
                            :
                            <button
                                onClick={() => setIsEditing(true)}
                                className="base-button bg-detail"
                            >
                                Редактировать
                            </button>
                        }
                    </div>
                )
            }

            {
                isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 text-2xl"
                    />
                ) : (
                    <h2 className="size-full break-words text-2xl">
                        {title}
                    </h2>
                )}

            <div className="relative aspect-[7/2] w-full">
                {
                    imgFile == null ?
                        <Image
                            src={getImageUrl(imgUrl)}
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="News Image"
                            className="select-none"
                        />
                        :
                        <Image
                            src={URL.createObjectURL(imgFile)}
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="News Image"
                            className="select-none"
                            unoptimized
                        />
                }
                {
                    isEditing &&
                    <>
                        <button
                            onClick={onEditPhoto}
                            className="absolute right-2 top-2 p-4">
                            <Image
                                src="/edit.svg"
                                alt="изменить"
                                fill={true}
                            />
                        </button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                }
                <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1">
                    {
                        isEditing ? (
                            <input
                                type="date"
                                value={convertFromDisplayToDateInputFormat(postingDate)}
                                onChange={(e) => setPostingDate(convertFromDateInputToDisplayFormat(e.target.value))}
                                className="bg-transparent text-base font-bold invert"
                            />
                        ) : (
                            <div className="text-base font-bold text-white">
                                {postingDate}
                            </div>
                        )
                    }
                </div>
            </div>

            {
                isEditing ? (
                    <TextareaAutosize
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border p-2 text-base"
                        minRows={1}
                    />
                ) : (
                    <p className="size-full break-words text-base">
                        {text}
                    </p>
                )
            }
        </div>
    );
}