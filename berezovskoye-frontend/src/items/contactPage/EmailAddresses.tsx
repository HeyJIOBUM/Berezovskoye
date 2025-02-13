export interface Email {
    id: number;
    name: string;
    email: string;
}

export const GetEmails = (): Email[] => {
    return [
        {
            id: 1,
            name: "Приемная",
            email: "tbz@brest.gas.by",
        },
        {
            id: 2,
            name: "Сектор МТОиМ",
            email: "torf@brest.gas.by",
        },
        {
            id: 3,
            name: "Сектор БУиО",
            email: "torf_mts@brest.gas.by",
        },
        {
            id: 4,
            name: "Снабжение",
            email: "torf-snab@brest.gas.by",
        },
        {
            id: 5,
            name: "Юрисконсульт",
            email: "torf-jurist@brest.gas.by",
        },
        {
            id: 6,
            name: "ПТС",
            email: "torf-pts@brest.gas.by",
        },
    ];
};