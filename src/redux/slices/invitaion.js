import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    email: null,
    expiry: null,
    typeId: null,
    roleId: null,
    escoId: null,
    invitationToken: null,
    permissionId: null
};

const invitaionSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        setInvitaion: (state, action) => {
            const { expiry, typeId, roleId, escoId, email, invitationToken, permissionId } = action.payload;
            state.invitationToken = invitationToken;
            state.expiry = expiry;
            state.typeId = typeId;
            state.roleId = roleId;
            state.escoId = escoId;
            state.email = email;
            state.permissionId = permissionId;
        },
        clearInvitaion: (state) => {
            state.invitationToken = null;
            state.expiry = null;
            state.typeId = null;
            state.roleId = null;
            state.escoId = null;
            state.email = null;
            state.permissionId = null;
        }
    }
})

export const { setInvitaion, clearInvitaion } = invitaionSlice.actions;
export default invitaionSlice.reducer;