import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeItemFromCart: (state, action) => {
            let id = action.payload;
            let idx;
            state.user.wishlist.forEach((item, index) => {
                if(item.propertyId === id) {
                    idx = index;
                }
            });
            state.user.wishlist.splice(idx, 1);
        }
    },
});

export const { setUser, removeItemFromCart } = userSlice.actions;

export default userSlice.reducer;