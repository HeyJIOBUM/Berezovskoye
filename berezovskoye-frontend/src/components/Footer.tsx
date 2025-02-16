import React from "react";
import {SocialMedia} from "@/items/footer/SocialMedia";
import Link from "next/link";
import Image from "next/image";
import {RelatedOrganization, RelatedOrganizations} from "@/items/footer/RelatedOrganizations";
import CopyableText from "@/components/CopyableText";

export default function Footer() {
    const socialNetworks = SocialMedia();
    const relatedOrganizations = RelatedOrganizations();

    return (
        <footer className="flex w-full items-center justify-center bg-back-bars">
            <div className="base-container justify-between gap-6 py-4 text-white sm:flex-row">
                <div className="flex flex-col items-center text-xs sm:items-start">
                    <div>Номер телефона:</div>
                    <div className="ml-0 lg:ml-5">
                        +375 (1645) 31932
                    </div>
                    <div>Emails:</div>
                    <div className="ml-0 lg:ml-5">
                        <CopyableText
                            description={"Приёмная: "}
                            textToCopy={"tbz@brest.gas.by"}
                            timeToResetTooltip={3000}
                        />
                        <CopyableText
                            description={"Юрисконсульт: "}
                            textToCopy={"torf-jurist@brest.gas.by"}
                            timeToResetTooltip={3000}
                        />
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
                                socialMedia={item}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2 lg:gap-4">
                        {relatedOrganizations.map((item, index) => (
                            <RelatedOrganizationItem
                                key={index}
                                relatedOrganization={item}
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
    socialMedia: SocialMedia;
}

export const SocialMediaItem: React.FC<SocialMediaItemProps> = ({socialMedia}) => {
    return (
        <Link
            href={socialMedia.href}
            className=""
        >
            <Image
                src={socialMedia.imageSrc}
                width={45}
                height={45}
                alt={socialMedia.alt}
                className="select-none"
            />
        </Link>
    );
};

interface RelatedOrganizationItemProps {
    relatedOrganization: RelatedOrganization;
}

export const RelatedOrganizationItem: React.FC<RelatedOrganizationItemProps> = ({relatedOrganization}) => {
    return (
        <Link href={`${relatedOrganization.href}`}>
            <Image
                src={relatedOrganization.imageSrc}
                width={relatedOrganization.width}
                height={relatedOrganization.height}
                alt={relatedOrganization.alt}
                className="select-none"
            />
        </Link>
    );
};