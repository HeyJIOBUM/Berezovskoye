"use client"

import {redirect} from "next/navigation";
import Image from "next/image";
import React from "react";
import {Service} from "@/items/TestServices";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const onDetailsOpen = () => {
        redirect(service.pageUrl);
    }

    const onRequestSubmit = () => {
        console.log("отправляем заявку")
    }

    return (
        <div className="flex flex-col items-start justify-between gap-2 bg-white p-2.5">
            <div className="relative aspect-[7/4] w-full select-none">
                <Image
                    src={service.imgUrl}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="News Image"
                />
            </div>

            <div className="w-full">
                <h2 className="text-xl">
                    {service.title}
                </h2>

                <p className="line-clamp-3 text-base">
                    {service.text}
                </p>
            </div>

            <div className="flex w-full justify-between gap-2 text-sm">
                <button
                    className="flex-1 bg-detail p-2 font-bold text-white"
                    onClick={onDetailsOpen}
                >
                    Подробнее
                </button>
                <button
                    className="flex-1 bg-buy p-2 font-bold text-white"
                    onClick={onRequestSubmit}
                >
                    Подать заявку
                </button>
            </div>
        </div>
    );
}