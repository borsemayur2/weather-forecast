import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload.city;
    },
  },
});

export const { setCity } = weatherSlice.actions;

export default weatherSlice.reducer;
