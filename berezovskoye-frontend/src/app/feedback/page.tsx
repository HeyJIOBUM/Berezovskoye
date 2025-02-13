"use client"

import TextWithLines from "@/components/TextWithLines";
import TextareaAutosize from 'react-textarea-autosize';
import React from "react";

export default function Page() {
    const onRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Request Submitted");
    }

    return (
        <div className="flex w-full max-w-screen-sm flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text="Обратная связь"/>
            <form
                className="flex flex-col gap-4 bg-white p-2.5"
                onSubmit={onRequestSubmit}
            >
                <p className="font-light">
                    Здесь вы можете отправить заявку на покупку нашей продукции, оставить заявку на оказание услуг,
                    проведение мероприятия или написать нам письмо. Для того что бы ваше письмо было рассмотрено,
                    пожалуйста заполните все поля помеченные звездочками(*)
                </p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-base">
                            ФИО *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            className="border-b border-black focus:outline-none py-1"
                            placeholder="Введите ваше ФИО"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-base">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="border-b border-black focus:outline-none py-1"
                            placeholder="Введите ваш Email"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="text-base">
                            Номер телефона *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="border-b border-black focus:outline-none py-1"
                            placeholder="Введите ваш номер телефона"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="address" className="text-base">
                            Адрес *
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            className="border-b border-black focus:outline-none py-1"
                            placeholder="Введите ваш адрес"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="text-base">
                            Текст запроса *
                        </label>
                        <TextareaAutosize
                            id="message"
                            name="message"
                            required
                            className="border-b border-black focus:outline-none py-1 resize-none"
                            placeholder="Введите текст вашего запроса"
                            rows={1}
                            maxRows={8}
                        />
                    </div>
                </div>
                <button type={"submit"} className="w-full bg-buy p-2 text-sm font-black text-white">
                    Подать заявку
                </button>
            </form>
        </div>
    );
}