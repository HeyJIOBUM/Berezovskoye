"use client";

import {useEffect} from 'react';
import {checkAuthCookie} from "@/lib/cookieUtils";
import {useDispatch, useSelector} from "react-redux";
import {logIn, logOut} from "@/lib/redux/authSlice";
import {RootState} from "@/lib/redux/store";

export function useAuth() {
    const dispatch = useDispatch();
    const isAuthInRedux = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await checkAuthCookie();
            if (isAuth != isAuthInRedux) {
                dispatch(isAuth ? logIn() : logOut());
            }
        };

        checkAuth();
    }, [dispatch, isAuthInRedux]);

    return isAuthInRedux;
}