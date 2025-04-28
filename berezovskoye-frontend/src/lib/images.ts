import {baseApiUrl} from "@/lib/api/applicationApi";

export const getImageUrl = (path: string) => {
    console.log(path);
    if (!path || path === "")
        path = "/placeholder.svg"
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || baseApiUrl + '/image/';
    return `${baseUrl}${path}`;
};