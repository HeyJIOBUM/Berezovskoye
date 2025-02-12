import React from "react";
import {SocialNetworks} from "@/items/SocialNetworks";
import Link from "next/link";
import Image from "next/image";
import {RelatedOrganizations} from "@/items/RelatedOrganizations";

export default function Footer() {
    const socialNetworks = SocialNetworks();
    const relatedOrganizations = RelatedOrganizations();

    return (
        <footer className="flex w-full items-center justify-center bg-back-bars">
            <div className="flex w-full max-w-screen-lg flex-col justify-between gap-6 p-4 text-white sm:flex-row">
                <div className="flex flex-col items-center text-xs sm:items-start">
                    <div>Номер телефона:</div>
                    <div className="ml-0 lg:ml-5">
                        +375 (1645) 31932
                    </div>
                    <div>Emails:</div>
                    <div className="ml-0 lg:ml-5">
                        <div>
                            Приёмная: <span className="text-logo-color">tbz@brest.gas.by</span>
                        </div>
                        <div>
                            Юрисконсульт: <span className="text-logo-color">torf-jurist@brest.gas.by</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-base">
                        Подписывайтесь на наши соцсети
                    </div>
                    <div className="mt-2 flex gap-2 lg:mt-4 lg:gap-4">
                        {socialNetworks.map((item, index) => (
                            <SocialMediaItem
                                key={index}
                                alt={item.alt}
                                iconPath={item.imageSrc}
                                href={item.href}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-2">
                    <div className="flex gap-2 lg:gap-4">
                        {relatedOrganizations.map((item, index) => (
                            <RelatedOrganizationItem
                                key={index}
                                alt={item.alt}
                                iconPath={item.imageSrc}
                                width={item.width}
                                height={item.height}
                            />
                        ))}
                    </div>
                    <div>
                        © 2025 ТПУ «Березовское»
                    </div>
                </div>
            </div>
        </footer>
    );
}

interface SocialMediaItemProps {
    alt: string;
    iconPath: string;
    href: string;
}

export const SocialMediaItem: React.FC<SocialMediaItemProps> = ({alt, iconPath, href}) => {
    return (
        <Link
            href={href}
            className=""
        >
            <Image
                src={iconPath}
                width={45}
                height={45}
                alt={alt}
            />
        </Link>
    );
};

interface RelatedOrganizationItemProps {
    alt: string;
    iconPath: string;
    width: number;
    height: number;
}

export const RelatedOrganizationItem: React.FC<RelatedOrganizationItemProps> = ({alt, iconPath, width, height}) => {
    return (
        <Image
            src={iconPath}
            width={width}
            height={height}
            alt={alt}
        />
    );
};