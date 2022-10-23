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
        }
    }
})

export const { loginStart, loginSuccess, loginFail, logOut } = userSlice.actions;

export default userSlice.reducer;