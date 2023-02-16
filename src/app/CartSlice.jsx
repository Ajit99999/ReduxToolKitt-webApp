import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            items: []
        },
        reducers: {
            ADD_ITEM: (state, action) => {

                state.items.push(action.payload);
            },
            CLEAR_ITEM: (state, action) => {
                state.items = []
            }
        }
    }
)

export const { ADD_ITEM, CLEAR_ITEM } = cartSlice.actions;

export default cartSlice.reducer
