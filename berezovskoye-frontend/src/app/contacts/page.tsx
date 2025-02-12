import TextWithLines from "@/components/TextWithLines";
import {GetContacts} from "@/items/ContactsPage/ContactPhoneNumbers";
import {GetEmails} from "@/items/ContactsPage/EmailAddresses";

export default function Page() {
    const contactPhoneNumbers = GetContacts();
    const emailAddresses = GetEmails();

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 sm:gap-4 py-2 sm:py-4">
            <TextWithLines text="Контакты"/>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-[16px] font-medium sm:text-[18px]">Реквизиты:</p>
                <p className="text-[14px] font-light sm:text-[16px]">
                    225260 Брестская область Ивацевичский район пос. Зелёный Бор ул. Центральная 5 р/с
                    BY49AKBB30121111900111300000 БИК AKBBBY2X в ОАО «АСБ Беларусбанк», УНП 200274574, Голуб Виктор
                    Викторович на основании доверенности УП &#34;Брестоблгаз&#34; №315 от 29.12.2022
                </p>
            </div>
            <div className="flex flex-col gap-2 bg-white p-1 sm:p-2.5">
                <p className="text-[16px] font-medium sm:text-[18px]">Номера контактных телефонов:</p>
                <table className="w-full border-collapse text-[14px] sm:text-[16px]">
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
                <p className="text-[16px] font-medium sm:text-[18px]">Адреса электронной почты:</p>
                <table className="w-full border-collapse text-[14px] sm:text-[16px]">
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
                <p className="text-[16px] font-medium sm:text-[18px]">
                    Реализация торфяных топливных брикетов на экспорт:
                </p>
                <div>
                    <p className="text-[14px] font-medium sm:text-[16px]">
                        УП &#34;Брестоблгаз&#34; ул. Генерала Попова, 16, 224012, г. Брест
                    </p>
                    <table className="w-full border-collapse text-[14px] sm:text-[16px]">
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
                <p className="text-[16px] font-medium sm:text-[18px]">Схемы проезда:</p>
                <div>
                </div>
            </div>
        </div>
    );
}