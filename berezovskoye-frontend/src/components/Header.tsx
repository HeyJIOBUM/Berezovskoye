"use client"

import Image from 'next/image';
import { HeaderItems } from '@/items/HeaderItems';
import Link from 'next/link';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {redirect, RedirectType} from "next/navigation";

export default function Header() {
    const headerItems = HeaderItems();
    const width = 150;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => {
        if (isMenuOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsMenuOpen(false);
                setIsClosing(false);
            }, 250);
        } else {
            setIsMenuOpen(true);
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleClickOnLogo = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (e.ctrlKey){
            closeMenu();
            redirect('/admin', RedirectType.push);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                toggleMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, toggleMenu]);

    return (
        <React.Fragment>
            <header className="sticky top-0 z-50 flex h-[50px] items-center justify-between bg-back-bars px-4 sm:px-8">
                <div onClick={handleClickOnLogo}>
                    <Image
                        alt={"logo"}
                        src={"/header/logo.svg"}
                        width={width}
                        height={45}
                    />
                </div>

                <div className="hidden items-center gap-2 sm:gap-4 md:flex">
                    {headerItems.map((item, index) => (
                        <HeaderNavItem
                            key={index}
                            label={item.name}
                            iconPath={item.imageSrc}
                            href={item.href}
                            onClick={closeMenu}
                        />
                    ))}
                </div>

                <div
                    className="hidden md:flex"
                    style={{
                        width: width,
                    }}
                >
                    <HeaderNavItem
                        label={"О нас"}
                        iconPath={"/header/about-us.svg"}
                        href={"/about"}
                        className={"ml-auto"}
                        onClick={closeMenu}
                    />
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="flex items-center justify-between">
                        <Image
                            src={"/header/burger-menu.svg"}
                            width={42}
                            height={20}
                            alt=""
                            className={isMenuOpen ? "-scale-y-100" : ""}
                        />
                    </button>
                </div>
            </header>

            {(isMenuOpen || isClosing) && (
                <div
                    ref={menuRef}
                    className={`${isClosing ? 'animate-slideUp' : 'animate-slideDown'} fixed inset-x-0 top-[50px] z-40 bg-back-bars md:hidden`}
                >
                    <div className="flex flex-col">
                        {headerItems.map((item, index) => (
                            <HeaderNavItem
                                key={index}
                                label={item.name}
                                iconPath={item.imageSrc}
                                href={item.href}
                                className="border-t py-4"
                                onClick={toggleMenu}
                            />
                        ))}
                        <HeaderNavItem
                            label={"О нас"}
                            iconPath={"/header/about-us.svg"}
                            href={"/about"}
                            className="border-t py-4"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

interface HeaderNavItemProps {
    label: string;
    iconPath: string;
    href: string;
    className?: string;
    onClick?: () => void;
}

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({label, iconPath, href, className, onClick}) => {
    return (
        <Link
            href={href}
            className={`flex flex-row items-center space-x-2 px-2 py-1.5 text-sm ${className}`}
            onClick={onClick}
        >
            <Image
                src={iconPath}
                width={20}
                height={20}
                alt=""
            />
            <span className="font-black text-white">
                {label}
            </span>
        </Link>
    );
};