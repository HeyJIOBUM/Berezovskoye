"use server"

import {cookies} from "next/headers";

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

export async function checkAuthCookie(): Promise<boolean> {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');

    return !!jwtCookie;
}