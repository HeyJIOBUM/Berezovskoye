import TextWithLines from "@/components/TextWithLines";
import React from "react";
import {Service, TestServices} from "@/items/TestServices";
import ServiceCard from "@/components/ServiceCard";

export default function Page() {
    const services = TestServices();

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text={"Услуги"}/>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {services.map((service: Service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                    />
                ))}
            </div>
        </div>
    );
}