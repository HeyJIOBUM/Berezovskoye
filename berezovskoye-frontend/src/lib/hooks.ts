"use client";

import {useEffect, useState} from 'react';
import {checkAuthCookie} from "@/lib/cookieUtils";
import {useDispatch, useSelector} from "react-redux";
import {logIn, logOut} from "@/lib/redux/authSlice";
import {RootState} from "@/lib/redux/store";

export function useAuth() {
    const dispatch = useDispatch();
    const isAuthInRedux = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await checkAuthCookie();
            if (isAuth != isAuthInRedux) {
                dispatch(isAuth ? logIn() : logOut());
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [dispatch, isAuthInRedux]);

    return {isAuthenticated: isAuthInRedux, isLoading};
}