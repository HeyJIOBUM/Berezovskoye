import {Montserrat} from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <body className={`${montserrat.className} flex min-h-screen flex-col`}>
        <Header/>
        <div className="flex w-full grow justify-center">
            <div className="w-full max-w-screen-lg p-4">
                {children}
            </div>
        </div>
        <Footer/>
        </body>
        </html>
    );
}
