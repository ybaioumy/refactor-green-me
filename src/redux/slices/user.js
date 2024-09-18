import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    token: null,
    expiry: null,
    typeId: null,
    role: null,
    fullName: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, expiry, typeId, role, fullName } = action.payload; 
            Cookies.set('token', token, {
                expires: new Date(expiry),
                secure: true,   // Use only HTTPS
                sameSite: 'Strict',  // CSRF protection
                httpOnly: false, // JS can still access this; set to true on server-side
            });

            state.token = token;
            state.expiry = expiry;
            state.typeId = typeId;
            state.role = role;
            state.fullName = fullName;
        },
        clearCredentials: (state) => {
            Cookies.remove('token'); // Clear token from cookies

            state.token = null;
            state.expiry = null;
            state.typeId = null;
            state.role = null;
            state.fullName = null;
        }
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
