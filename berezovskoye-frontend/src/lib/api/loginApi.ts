import {baseApiUrl} from "@/lib/api/applicationApi";
import {setAuthCookie} from "@/lib/cookieUtils";

export const loginUser = async (login: string, password: string) => {
    try {
        const response = await fetch(`${baseApiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({login, password}),
        });

        if (!response.ok) {
            throw new Error("Ошибка авторизации");
        }

        const jwt = await response.text();

        await setAuthCookie(jwt);
        return {success: true};
    } catch (error) {
        return {success: false, error: error instanceof Error ? error.message : "Ошибка авторизации"};
    }
};