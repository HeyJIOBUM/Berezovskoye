"use client"

import TextWithLines from "@/components/TextWithLines";
import React from "react";

export default function Page() {
    const onRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Request Submitted");
    }

    return (
        <div className="small-container">
            <TextWithLines text="Панель администратора"/>
            <form
                className="base-form"
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
                            className="base-input"
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
                            className="base-input"
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                </div>
                <button type="submit" className="base-button bg-buy">
                    Войти в аккаунт
                </button>
            </form>
        </div>
    );
}