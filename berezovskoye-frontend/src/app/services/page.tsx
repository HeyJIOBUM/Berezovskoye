import TextWithLines from "@/components/TextWithLines";
import React from "react";
import {Service, TestServices} from "@/items/TestServices";
import ServiceCard from "@/components/ServiceCard";

export default function Page() {
    const services = TestServices();

    return (
        <div className="base-container">
            <TextWithLines text={"Услуги"}/>
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
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