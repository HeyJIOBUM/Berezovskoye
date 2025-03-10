import {configureStore} from '@reduxjs/toolkit'
import {applicationApi} from "@/lib/api/applicationApi";
import {authReducer} from "@/lib/redux/authSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer: authReducer,
            [applicationApi.reducerPath]: applicationApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(applicationApi.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']