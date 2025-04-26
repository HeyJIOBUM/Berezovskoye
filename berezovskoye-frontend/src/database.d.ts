export interface News {
    id: number;
    title: string;
    text: string;
    imgUrl: string;
    postingDate: string;
}

export interface Product {
    id: string;
    visible: boolean;
    name: string;
    description: string;
    imgUrl: string;
    priceUrl: string;
    packagingType: string;
    price: string;
}