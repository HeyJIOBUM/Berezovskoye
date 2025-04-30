import {baseApiUrl} from "@/lib/api/applicationApi";

export const getImageUrl = (path: string) => {
    if (!path || path === "")
        return "/placeholder.svg";
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || baseApiUrl + '/image/';
    return `${baseUrl}${path}`;
};