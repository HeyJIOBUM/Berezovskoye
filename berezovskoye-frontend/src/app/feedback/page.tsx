"use client"

import TextWithLines from "@/components/TextWithLines";
import TextareaAutosize from 'react-textarea-autosize';
import React from "react";
import {sendFeedback} from "@/lib/email";

export default function Page() {
    const onRequestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const formValues = {
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            message: formData.get('message') as string
        };

        sendFeedback(formValues);
        form.reset();
    }
    return (
        <div className="small-container">
            <TextWithLines text="Обратная связь"/>
            <form
                className="base-form"
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
                            className="base-input"
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
                            className="base-input"
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
                            className="base-input"
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
                            className="base-input"
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
                            className="base-input resize-none"
                            placeholder="Введите текст вашего запроса"
                            rows={1}
                            maxRows={8}
                        />
                    </div>
                </div>
                <button type="submit" className="base-button bg-buy">
                    Подать заявку
                </button>
            </form>
        </div>
    );
}