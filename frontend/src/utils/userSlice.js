import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User',
    initialState: {
        // isLoggedIn: false,
        // userid: "",
        // username: ""
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            // state.isLoggedIn = true;
            // state.username = action.payload.username;
            // state.userid = action.payload.userid;
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;