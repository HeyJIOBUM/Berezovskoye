"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";

export default function Page() {
    const onRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Request Submitted");
    }

    return (
        <div className="flex w-full max-w-screen-sm flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text="Панель администратора"/>
            <form
                className="flex flex-col gap-4 bg-white p-2.5"
                onSubmit={onRequestSubmit}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="login" className="text-base">
                            Логин
                        </label>
                        <input
                            type="login"
                            id="login"
                            name="login"
                            className="border-b border-black py-1 focus:outline-none"
                            placeholder="Введите ваш логин"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-base">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="border-b border-black py-1 focus:outline-none"
                            placeholder="Введите ваш пароль"
                        />
                    </div>

                </div>
                <button type={"submit"} className="w-full bg-buy p-2 text-sm font-black text-white">
                    Войти в аккаунт
                </button>
            </form>
        </div>
    );
}