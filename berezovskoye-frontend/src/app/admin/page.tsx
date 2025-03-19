"use client";

import TextWithLines from "@/components/TextWithLines";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {logIn} from "@/lib/redux/authSlice";
import {redirect, RedirectType} from "next/navigation";
import {loginUser} from "@/lib/api/loginApi";

export default function Page() {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);

    const onRequestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const login = formData.get("login") as string;
        const password = formData.get("password") as string;

        const result = await loginUser(login, password);

        if (result.success) {
            dispatch(logIn());
            redirect('/news', RedirectType.push);
        } else {
            setError(result.error || "Произошла ошибка при авторизации");
            setTimeout(() => {
                setError(null);
            }, 5000);
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
                            minLength={4}
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
                            minLength={4}
                            className="base-input"
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                </div>
                <button type="submit" className="base-button bg-buy">
                    Войти в аккаунт
                </button>
            </form>

            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700">
                    {error}
                </div>
            )}
        </div>
    );
}