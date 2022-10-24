import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curVideo: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.curVideo = action.payload;
            state.loading = false;
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.curVideo.likes.includes(action.payload)) {
                state.curVideo.likes.push(action.payload);
                state.curVideo.dislikes.splice(
                    state.curVideo.dislikes.findIndex(
                        userId => userId === action.payload
                    ), 1
                )
            }
        },
        dislike: (state, action) => {
            if (!state.curVideo.dislikes.includes(action.payload)) {
                state.curVideo.dislikes.push(action.payload);
                state.curVideo.likes.splice(
                    state.curVideo.likes.findIndex(
                        userId => userId === action.payload
                    ), 1
                )
            }
        },
    }
})

export const { fetchStart, fetchSuccess, fetchFail, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;