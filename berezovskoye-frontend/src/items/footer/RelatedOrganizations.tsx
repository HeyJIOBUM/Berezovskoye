export interface RelatedOrganization {
    alt: string;
    imageSrc: string;
    width: number;
    height: number;
    href: string;
}

export const RelatedOrganizations = (): RelatedOrganization[] => {
    return [
        {
            alt: 'БрГТУ',
            imageSrc: '/footer/brstu.svg',
            width: 45,
            height: 45,
            href: 'https://www.bstu.by/',
        },
        {
            alt: 'Брестоблгаз',
            imageSrc: '/footer/oblgaz.svg',
            width: 50,
            height: 45,
            href: 'https://www.brest.gas.by/'
        },
        {
            alt: 'Министерство энергетики Республики Беларусь',
            imageSrc: '/footer/energy_ministry.svg',
            width: 58,
            height: 45,
            href: 'https://minenergo.gov.by/',
        },
    ];
};