import {baseApiUrl} from "@/lib/api/applicationApi";

export const getXlsUrl = (path: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_XLS_BASE_URL || baseApiUrl +'/xls/';
    return `${baseUrl}${path}`;
};