import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.curUser = action.payload;
            state.loading = false;
        },
        loginFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        logOut: (state) => {
            state.curUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.curUser.subscribedUsers.includes(action.payload)) {
                state.curUser.subscribedUsers.splice(
                    state.curUser.subscribedUsers.findIndex(channelId => channelId === action.payload), 1
                )
            } else {
                state.curUser.subscribedUsers.push(action.payload);
            }
        }
    }
})

export const { loginStart, loginSuccess, loginFail, logOut, subscription } = userSlice.actions;

export default userSlice.reducer;