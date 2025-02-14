"use client"

import {redirect} from "next/navigation";
import Image from "next/image";
import React from "react";
import {Service} from "@/items/TestServices";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({service}: ServiceCardProps) {
    const onDetailsOpen = () => {
        redirect(service.pageUrl);
    }

    const onRequestSubmit = () => {
        console.log("отправляем заявку")
    }

    return (
        <div className="grid grid-cols-1 gap-1 bg-white p-1 sm:grid-cols-2 sm:gap-2 sm:p-2.5">
            <div className="relative h-full min-h-52 select-none">
                <Image
                    src={service.imgUrl}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="News Image"
                />
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
                <div className="w-full">
                    <h2 className="text-lg font-normal">
                        {service.title}
                    </h2>
                    <p className="line-clamp-[8] text-base font-light">
                        {service.text}
                    </p>
                </div>
                <div className="flex w-full justify-between gap-1 text-sm sm:gap-2">
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
        </div>
    );
}