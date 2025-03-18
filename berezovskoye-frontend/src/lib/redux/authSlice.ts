import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
}

const authInitialState: AuthState = {
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        logOut: (state) => {
            state.isAuthenticated = false;
        },
        logIn: (state) => {
            state.isAuthenticated = true;
        },
    },
});

export const {logOut, logIn} = authSlice.actions;
export const authReducer = authSlice.reducer;