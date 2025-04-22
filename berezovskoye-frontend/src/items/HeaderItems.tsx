export interface HeaderItem {
    name: string,
    href: string,
    imageSrc: string,
}

export const HeaderItems = (): HeaderItem[] => {
    return [
        {
            name: 'Товары',
            href: '/products',
            imageSrc: '/header/products.svg',
        },
        {
            name: 'Новости',
            href: '/news',
            imageSrc: '/header/news.svg',
        },
        {
            name: 'Услуги',
            href: '/services',
            imageSrc: '/header/services.svg',
        },
        {
            name: 'Контакты',
            href: '/contacts',
            imageSrc: '/header/contacts.svg',
        },
    ];
};
