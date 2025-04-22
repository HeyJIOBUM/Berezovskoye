import {baseApiUrl} from "@/lib/api/applicationApi";
import {setAuthCookie} from "@/lib/cookieUtils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loginUser = async (login: string, password: string) => {
    try {
        const response = await fetch(`${baseApiUrl}/login`, {
            // change to POST and uncomment body with spring backend
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({login, password}),
        });

        if (!response.ok) {
            throw new Error("Ошибка авторизации");
        }

        const data = await response.json();
        const {jwt} = data;

        await setAuthCookie(jwt);
        return {success: true};
    } catch (error) {
        return {success: false, error: error instanceof Error ? error.message : "Произошла ошибка"};
    }
};