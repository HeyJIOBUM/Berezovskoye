export interface Product {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
}

export const TestProducts = (): Product[] => {
    return [
        {
            id: 1,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
        {
            id: 2,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
        {
            id: 3,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
        {
            id: 4,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
        {
            id: 5,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
        {
            id: 6,
            name: "Дрова ТУ BY 190799594.001-2017",
            description: "Дрова лиственных и хвойных пород деревьев.",
            imgUrl: "/product.png",
        },
    ];
};