import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    token: null,
    expiry: null,
    typeId: null,
    role: null,
    fullName: null,
    userId: null,
    invitationToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, expiry, typeId, role, fullName, userId, invitationToken } = action.payload;
            state.token = token;
            state.expiry = expiry;
            state.typeId = typeId;
            state.role = role;
            state.fullName = fullName;
            state.userId = userId;
            state.invitationToken = invitationToken;
        },
        clearCredentials: (state) => {
            Cookies.remove('token');
            state.token = null;
            state.expiry = null;
            state.typeId = null;
            state.role = null;
            state.fullName = null;
            state.invitationToken = null;
        }
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
