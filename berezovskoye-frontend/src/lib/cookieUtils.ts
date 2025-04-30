"use server"

import {cookies} from "next/headers";
import {jwtVerify} from "jose";

export async function setAuthCookie(jwt: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'jwt',
        value: jwt,
        maxAge: 60,
        httpOnly: true,
        path: '/',
    })
}

export async function deleteAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('jwt');
}

export async function checkAuthCookie(): Promise<boolean> {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');

    if (!jwtCookie) {
        return false;
    }

    const jwt = jwtCookie.value;

    try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const {payload} = await jwtVerify(jwt, secret);

        if (payload.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp < currentTime) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return false;
    }
}