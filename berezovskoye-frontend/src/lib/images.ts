import {baseApiUrl} from "@/lib/api/applicationApi";

export const getImageUrl = (path: string) => {
    if (!path || path === "")
        return "/placeholder.svg";
    const baseUrl = baseApiUrl + '/image/';
    return `${baseUrl}${path}`;
};