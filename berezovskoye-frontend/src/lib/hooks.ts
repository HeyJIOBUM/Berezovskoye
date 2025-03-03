"use client";

import {useEffect, useState} from 'react';
import {checkAuthCookie} from "@/lib/cookieUtils";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(await checkAuthCookie())
        };

        checkAuth();
    }, []);

    return isAuthenticated;
}