"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";
import Image from "next/image";

export default function Page() {
    const onRequestSubmit = () => {
        console.log("отправляем заявку")
    }

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text="Торфяные топливные брикеты"/>
            <div className="flex flex-col gap-1 bg-white p-1 sm:gap-2 sm:p-2.5">
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="size-full min-h-[200px] bg-[url(/services/peat.png)] bg-cover bg-center md:min-w-[40%]"/>
                    <p className="text-base font-normal">
                        Торфяные топливные брикеты марки БТ-1, произведенные ТПУ «Березовское», давно оценили не только
                        в Республике Беларусь, но и далеко за ее пределами. Вот уже
                        <span className="font-medium"> более 10 лет</span> торфяные брикеты
                        поставляются в Польшу, Словакию, Чехию, Латвию, Эстонию, Германию и другие страны.
                        Вся торфяная топливная продукция проходит лабораторные испытания на
                        <span className="font-medium"> экологическую безопасность. </span>
                        Благодаря размещению торфяных залежей в черте лесных массивов, торф обогащен содержанием
                        древесных включений, что по характеристикам приближает торфяные брикеты к
                        <span className="font-medium"> разряду биотоплива. </span>
                    </p>
                </div>
                <button
                    className="w-full bg-buy p-2 text-sm font-black text-white"
                    onClick={onRequestSubmit}
                >
                    Подать заявку
                </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col items-center justify-center gap-1 bg-white p-1 sm:gap-2.5 sm:p-2.5 md:flex-row-reverse">
                    <div className="size-full min-h-[200px] min-w-[40%] bg-[url(/services/peat_in_bag.png)] bg-cover bg-center"/>
                    <p className="text-base font-normal">
                        Показатели качества соответствуют <span className="font-medium"> СТБ 1919-2008 </span>
                        «Брикеты топливные на основе торфа». Брикеты торфяные топливные реализуются на экспорт
                        автомобильным транспортом на <span className="font-medium"> условиях FCA </span>
                        д. Нехачево, Ивацевичский район, Брестская область в упаковке
                        <span className="font-medium"> биг-бэг 0,5-1,0 тн</span>, а также в
                        <span className="font-medium"> термоусадочной пленке по 10 кг</span>, уложенный на поддон 1,0
                        тн.
                    </p>
                </div>
                <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                    <div className="size-full min-h-[120px] bg-[url(/services/train.png)] bg-cover bg-center"/>
                    <p className="font-normal">
                        Возможна поставка торфобрикета <span
                        className="font-medium"> железнодорожным транспортом </span>
                        в упаковке биг-бэг, в пленке термоусадочной на поддонах и навалом.
                        Цены, условия оплаты и доставки оговариваются индивидуально с каждым клиентом.
                    </p>
                </div>
            </div>
        </div>
    );
}