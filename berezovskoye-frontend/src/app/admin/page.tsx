"use client";

import TextWithLines from "@/components/TextWithLines";
import React from "react";
import {baseApiUrl} from "@/lib/api/applicationApi";
import {setAuthCookie} from "@/lib/cookieUtils";

export default function Page() {
    const onRequestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const formData = new FormData(e.target as HTMLFormElement);
        // const login = formData.get("login") as string;
        // const password = formData.get("password") as string;

        try {
            const response = await fetch(`${baseApiUrl}/login`, {
                // change to POST and uncomment body with spring back
                method: "GET",
                // body: JSON.stringify({login, password}),
            });

            if (!response.ok) {
                throw new Error("auth error");
            }

            const data = await response.json();
            const {jwt} = data;

            await setAuthCookie(jwt)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="small-container">
            <TextWithLines text="Панель администратора"/>
            <form className="base-form" onSubmit={onRequestSubmit}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="login" className="text-base">
                            Логин
                        </label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            required
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