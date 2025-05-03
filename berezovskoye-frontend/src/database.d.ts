export interface News {
    readonly id: number;
    title: string;
    text: string;
    imgUrl: string;
    postingDate: string;
}

export interface Product {
    readonly id: string;
    readonly version: number;
    visible: boolean;
    name: string;
    description: string;
    imgUrl: string;
    priceUrl: string;
    packagingType: string;
    price: string;
}