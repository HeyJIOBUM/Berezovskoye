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
            <div className="flex flex-col gap-2 bg-white p-2.5">
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="relative flex aspect-[1] w-full min-w-[30%] select-none">
                        <Image
                            src="/services/peat.png"
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="Торф в термоусадочной плёнке"
                        />
                    </div>
                    <p className="text-2xl">
                        Торфяные топливные брикеты марки БТ-1, произведенные ТПУ «Березовское», давно оценили не только
                        в Республике Беларусь, но и далеко за ее пределами. Вот уже
                        <span className="font-bold"> более 10 лет</span> торфяные брикеты
                        поставляются в Польшу, Словакию, Чехию, Латвию, Эстонию, Германию и другие страны.
                    </p>
                </div>
                <button
                    className="w-full bg-buy p-2 text-sm font-black text-white"
                    onClick={onRequestSubmit}
                >
                    Подать заявку
                </button>
            </div>
            <div className="flex flex-col gap-2 bg-white p-2.5">
                <div className="flex flex-col gap-2 md:flex-row">
                    <p>
                        Вся торфяная топливная продукция проходит лабораторные испытания на
                        <span className="font-bold"> экологическую безопасность. </span>
                        Благодаря размещению торфяных залежей в черте лесных массивов, торф обогащен содержанием
                        древесных включений, что по характеристикам приближает торфяные брикеты к
                        <span className="font-bold"> разряду биотоплива. </span>
                        Показатели качества соответствуют <span className="font-bold"> СТБ 1919-2008 </span>
                        «Брикеты топливные на основе торфа». Брикеты торфяные топливные реализуются на экспорт
                        автомобильным транспортом на <span className="font-bold"> условиях FCA </span>
                        д. Нехачево, Ивацевичский район, Брестская область в упаковке
                        <span className="font-bold"> биг-бэг 0,5-1,0 тн</span>, а также в
                        <span className="font-bold"> термоусадочной пленке по 10 кг</span>, уложенный на поддон 1,0 тн.
                    </p>
                    <div className="relative flex aspect-[1] w-full min-w-[35%] select-none">
                        <Image
                            src="/services/peat_in_bag.png"
                            fill={true}
                            style={{objectFit: "cover"}}
                            alt="Торф в мешках"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white p-2.5">
                <Image
                    src="/services/train.png"
                    width={1240}
                    height={190}
                    style={{objectFit: "contain"}}
                    alt="Поезд"
                />
                <p>
                    Возможна поставка торфобрикета <span className="font-bold"> железнодорожным транспортом </span>
                    в упаковке биг-бэг, в пленке термоусадочной на поддонах и навалом.
                    Цены, условия оплаты и доставки оговариваются индивидуально с каждым клиентом.
                </p>
            </div>
        </div>
    );
}