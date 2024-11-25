import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

        data : (state, action) => {
            state.value += action.payload
        },
    }
})

export const { data } = postSlice.actions

export const selectorPost = (state) => state.post.value

export default postSlice.reducer
