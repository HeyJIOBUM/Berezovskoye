import Image from 'next/image';
import { HeaderItems } from '@/items/HeaderItems';
import Link from 'next/link';
import React from 'react';

export default function Header() {
    const headerItems = HeaderItems();
    const width = 150;

    return (
        <header className="sticky top-0 z-50 flex h-[50px] items-center justify-between bg-back-bars px-4 sm:px-8">
            <Link href="/products">
                <Image
                    alt={"logo"}
                    src={"/header/logo.svg"}
                    width={width}
                    height={45}
                />
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                {headerItems.map((item, index) => (
                    <HeaderNavItem
                        key={index}
                        label={item.name}
                        iconPath={item.imageSrc}
                        href={item.href}
                    />
                ))}
            </div>

            <div
                className="flex"
                style={{
                    width: width,
                }}
            >
                <HeaderNavItem
                    label={"О нас"}
                    iconPath={"/header/about-us.svg"}
                    href={"/about"}
                />
            </div>
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
        <div className="ml-auto flex items-center gap-1 text-white">
            <Link
                href={href}
                className="flex flex-row items-center space-x-2 px-2 py-1.5 text-sm"
            >
                <Image
                    src={iconPath}
                    width={20}
                    height={20}
                    alt=""
                />
                <span className="hidden font-black md:inline">{label}</span>
            </Link>
        </div>
    );
};