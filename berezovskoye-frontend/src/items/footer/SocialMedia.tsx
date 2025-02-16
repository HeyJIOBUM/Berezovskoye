export interface SocialMedia {
    alt: string;
    href: string;
    imageSrc: string;
}

export const SocialMedia = (): SocialMedia[] => {
    return [
        {
            alt: 'instagram',
            href: 'https://www.instagram.com/tpu_berezovskoe/',
            imageSrc: '/social_networks/instagram.svg',
        },
        {
            alt: 'youtube',
            href: 'https://www.youtube.com/channel/UCg3eJHPv1Vu4-k0l-u_E5DQ',
            imageSrc: '/social_networks/youtube.svg',
        },
        {
            alt: 'vk',
            href: 'https://vk.com/brestoblgas',
            imageSrc: '/social_networks/vk.svg',
        },
        {
            alt: 'odnoklassniki',
            href: 'https://ok.ru/brestoblgas',
            imageSrc: '/social_networks/odnoklassniki.svg',
        },
        {
            alt: 'telegram',
            href: 'https://t.me/brestoblgaz',
            imageSrc: '/social_networks/telegram.svg',
        },
        {
            alt: 'facebook',
            href: 'https://www.facebook.com/brestoblgas/',
            imageSrc: '/social_networks/facebook.svg',
        },
    ];
};
