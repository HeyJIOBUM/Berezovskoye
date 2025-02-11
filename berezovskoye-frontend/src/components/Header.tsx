import Image from 'next/image'
import {HeaderItems} from "@/items/HeaderItems";
import Link from "next/link";
import React from "react";

export default function Header() {
    const headerItems = HeaderItems();

    return (
        <header className="sticky top-0 flex h-[70px] items-center justify-between bg-back-bars px-8">
            <Link href="/">
                <Image
                    alt={"logo"}
                    src={"/logo.svg"}
                    width={200}
                    height={55}
                />
            </Link>


            <div className="flex items-center gap-4">
                {
                    headerItems.map((item, index) => (
                        <HeaderNavItem
                            key={index}
                            label={item.name}
                            iconPath={item.imageSrc}
                            href={item.href}
                        />
                    ))
                }
            </div>

            <HeaderNavItem
                label={"О нас"}
                iconPath={"/about-us.svg"}
                href={"/about"}
            />
        </header>
    );
}

interface HeaderNavItemProps {
    label: string;
    iconPath: string;
    href: string;
}

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({label, iconPath, href}) => {
    return (
        <div className="flex items-center gap-1 text-white">
            <Link
                href={href}
                className="flex flex-row items-center space-x-2 px-2 py-1.5 text-sm"
            >
                <Image
                    src={iconPath}
                    width={30}
                    height={30}
                    alt=""
                />
                <span>{label}</span>
            </Link>
        </div>
    );
};