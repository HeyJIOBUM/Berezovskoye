export interface SocialMedia {
    alt: string;
    href: string;
    imageSrc: string;
}

export const SocialMedia = (): SocialMedia[] => {
    return [
        {
            alt: 'instagram',
            href: '#',
            imageSrc: '/social_networks/instagram.svg',
        },
        {
            alt: 'odnoklassniki',
            href: '#',
            imageSrc: '/social_networks/odnoklassniki.svg',
        },
        {
            alt: 'telegram',
            href: '#',
            imageSrc: '/social_networks/telegram.svg',
        },
        {
            alt: 'facebook',
            href: '#',
            imageSrc: '/social_networks/facebook.svg',
        },
        {
            alt: 'youtube',
            href: '#',
            imageSrc: '/social_networks/youtube.svg',
        },
        {
            alt: 'vk',
            href: '#',
            imageSrc: '/social_networks/vk.svg',
        },
    ];
};
