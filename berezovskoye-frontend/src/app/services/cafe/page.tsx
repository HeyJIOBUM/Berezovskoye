"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text="Кафе Лесная усадьба"/>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <div className="relative aspect-[2] w-full select-none">
                    <Image
                        src="/services/cafe.png"
                        fill={true}
                        style={{objectFit: "cover"}}
                        alt="Изображение кафе"
                    />
                </div>

                <div>
                    <p>
                        Здесь вам могут предложить кофе, чай, полакомиться конфетами, печеньем и другими кондитерскими
                        изделиями. Для любителей бильярдной игры на цокольном этаже оборудован бильярдный зал.
                    </p>
                </div>

                <div>
                    <p>
                        Будни: 11.00 до 22.00.
                    </p>
                    <p>
                        Выходные: 12.00 до 01.00.
                    </p>
                    <p>
                        п. Зеленый Бор ул.Центральная, 7
                    </p>
                </div>

                <Link
                    className="w-full bg-buy p-2 text-center text-sm font-black text-white"
                    href="/feedback"
                >
                    Подать заявку
                </Link>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="font-bold">
                    Подбробнее о кафе “Лесная усадьба”
                </p>
                <div className="relative aspect-[3] w-full select-none">
                    <Image
                        src="/services/chel.png"
                        fill={true}
                        style={{objectFit: "cover"}}
                        alt="Работники кафе"
                    />
                </div>
                <div className="flex flex-col gap-2 text-base font-normal">
                    <p>
                        В <span className="font-medium">августе 2012 года</span> в торфобрикетном производственном
                        управлении «Березовское» открылось кафе «Лесная усадьба». Кафе образовалось в результате
                        реконструкции здания бывшей столовой, находится по адресу
                        <span className="font-medium"> п. Зеленый Бор ул.Центральная, 7. </span>
                        Оказавшись на улице Центральной, вы увидите его сразу: здание кафе находится рядом с
                        отремонтированным зданием администрации. Узнать его можно по приятному желтому цвету.
                    </p>
                    <p>
                        В будние дни кафе работает
                        <span className="font-medium"> с 11.00 до 22.00, в выходные с 12.00 до 01.00.</span>
                    </p>
                    <p>
                        Здесь вам могут предложить кофе, чай, полакомиться конфетами, печеньем и другими
                        кондитерскими изделиями. Сюда посетители приходят просто для того, чтобы расслабиться,
                        отдохнуть и вкусно покушать.

                    </p>
                    <p>
                        Интерьер создан по последним канонам моды: кованые люстры и светильники, шторы в греческом
                        стиле и карнизы аркой, сверху глубокой волной стелется потолок, две огромные плазмы висят
                        друг против друга, благодаря чему посетители могут не только послушать музыку, но и посмотреть
                        различные телепередачи. Просторное помещение зала позволяет проводить торжественные мероприятия.
                    </p>
                    <p>
                        Уютная обстановка, вкусная еда и приятное обслуживание располагает к себе посетителей.
                        Для любителей бильярдной игры на цокольном этаже оборудован бильярдный зал.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 bg-white p-1 sm:gap-2.5 sm:p-2.5">
                <p className="font-bold">
                    Фотогалерея
                </p>
                <div className="grid select-none grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2.5">
                    <div className="relative h-auto w-full">
                        <Image
                            src="/services/outside_cafe.png"
                            width={500}
                            height={300}
                            style={{objectFit: "contain"}}
                            alt="Вид снаружи"
                        />
                    </div>

                    <div className="relative h-auto w-full">
                        <Image
                            src="/services/inside_cafe.png"
                            width={500}
                            height={300}
                            style={{objectFit: "contain"}}
                            alt="Вид внутри"
                        />
                    </div>

                    <div className="relative h-auto w-full">
                        <Image
                            src="/services/billiard.png"
                            width={500}
                            height={300}
                            style={{objectFit: "contain"}}
                            alt="Бильярдный стол"
                        />
                    </div>

                    <div className="relative h-auto w-full">
                        <Image
                            src="/services/chel.png"
                            width={500}
                            height={300}
                            style={{objectFit: "contain"}}
                            alt="Работники кафе"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}