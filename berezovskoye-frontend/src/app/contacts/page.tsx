import TextWithLines from "@/components/TextWithLines";
import {GetContacts} from "@/items/ContactsPage/ContactPhoneNumbers";
import {GetEmails} from "@/items/ContactsPage/EmailAddresses";

export default function Page() {
    const contactPhoneNumbers = GetContacts();
    const emailAddresses = GetEmails();

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text="Контакты"/>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-base font-medium sm:text-lg">Реквизиты:</p>
                <p className="text-sm font-light sm:text-base">
                    225260 Брестская область Ивацевичский район пос. Зелёный Бор ул. Центральная 5 р/с
                    BY49AKBB30121111900111300000 БИК AKBBBY2X в ОАО «АСБ Беларусбанк», УНП 200274574, Голуб Виктор
                    Викторович на основании доверенности УП &#34;Брестоблгаз&#34; №315 от 29.12.2022
                </p>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-base font-medium sm:text-lg">Номера контактных телефонов:</p>
                <table className="w-full border-collapse text-sm sm:text-base">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 text-left">Должность</th>
                        <th className="py-2 text-left">Имя</th>
                        <th className="py-2 text-left">Номер</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contactPhoneNumbers.map((item) => (
                        <tr key={item.id} className="even:bg-gray-100 hover:bg-gray-50">
                            <td className="py-0.5">{item.post}</td>
                            <td className="py-0.5">{item.name}</td>
                            <td className="py-0.5">{item.number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-base font-medium sm:text-lg">Адреса электронной почты:</p>
                <table className="w-full border-collapse text-sm sm:text-base">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 text-left">Название</th>
                        <th className="py-2 text-left">Почта</th>
                    </tr>
                    </thead>
                    <tbody>
                    {emailAddresses.map((item) => (
                        <tr key={item.id} className="even:bg-gray-100 hover:bg-gray-50">
                            <td className="py-0.5 font-medium">{item.name}</td>
                            <td className="py-0.5">{item.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-base font-medium sm:text-lg">
                    Реализация торфяных топливных брикетов на экспорт:
                </p>
                <div>
                    <p className="text-sm font-medium sm:text-base">
                        УП &#34;Брестоблгаз&#34; ул. Генерала Попова, 16, 224012, г. Брест
                    </p>
                    <table className="w-full border-collapse text-sm sm:text-base">
                        <tbody>
                        <tr className="bg-gray-100 hover:bg-gray-50">
                            <td className="py-0.5">Специалист по маркетингу</td>
                            <td className="py-0.5">Степанюк Юлия Степановна</td>
                        </tr>
                        <tr className="bg-gray-100 hover:bg-gray-50">
                            <td className="py-0.5">+375 (162) 274014</td>
                            <td className="py-0.5">step@brest.gas.by</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-0.5">Общий номер специалистов по реализации</td>
                            <td className="py-0.5">+375 (162) 274014</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-base font-medium sm:text-lg">Схемы проезда:</p>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="mb-1 text-sm font-medium sm:text-base">Завод ТПУ &#34;Березовское&#34;</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2870.6114106468126!2d25.213989369411745!3d52.65978796392076!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDM5JzM0LjIiTiAyNcKwMTInNTYuOSJF!5e1!3m2!1sru!2sby!4v1739396490058!5m2!1sru!2sby"
                            width="100%"
                            height="450"
                            style={{border: 0}}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"/>
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-medium sm:text-base">Административное здание ТПУ
                            &#34;Березовское&#34;</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2030.0815177167947!2d25.239607727838653!3d52.654345510947294!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sby!4v1739397143292!5m2!1sru!2sby"
                            width="100%"
                            height="450"
                            style={{border: 0}}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"/>
                    </div>
                </div>
            </div>
        </div>
    );
}