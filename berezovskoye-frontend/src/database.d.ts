export interface News {
    id: number;
    title: string;
    text: string;
    imgUrl: string;
    postingDate: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    packagingTypes: string[];
    qualityIndicators: string[];
    productDetailsTable: ProductDetailsTable;
}

export interface ProductDetailsTable {
    header: string[];
    categories: ProductDetailsCategory[];
}

export interface ProductDetailsCategory {
    categoryName: string;
    categoryDetails: string[][];
}