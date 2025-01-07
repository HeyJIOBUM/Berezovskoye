import {Montserrat} from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${montserrat.className}`}>
        <Header/>
        <div className={"p-4"}>
            {children}
        </div>
        </body>
        </html>
    );
}
