import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    details: null
};

export const placeSlice = createSlice({
    name: "place",
    initialState: { ...initialState },
    reducers: {
        showList: function (state, action) {
            state.list = action.payload;
        },
        showDetails: function(state,action){
            state.details = action.payload;
        }
    }
});

export const {
    showList,
    showDetails
} = placeSlice.actions;
  
export default placeSlice.reducer;
  