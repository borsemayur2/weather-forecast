import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    tempUnit: "fahrenheit",
    pageIndex: 0,
    selecetedWeatherItem: null,
    location: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload.city;
      state.pageIndex = 0;
      state.selectedWeatherItem = null;
      state.location = null;
    },
    setNextPage: (state) => {
      state.pageIndex += 1;
    },
    setPreviousPage: (state) => {
      state.pageIndex -= 1;
    },
    setSelectedWeatherItem: (state, action) => {
      state.selectedWeatherItem = action.payload.selectedWeatherItem;
    },
    setTempUnit: (state, action) => {
      state.tempUnit = action.payload.tempUnit;
    },
    setLocation: (state, action) => {
      state.location = action.payload.location;
      state.pageIndex = 0;
      state.selectedWeatherItem = null;
    },
    setUserWeatherInfo: (state, action) => {
      if (!action.payload) return;
      const { city, location, pageIndex, selectedWeatherItem, tempUnit } =
        action.payload;
      state.city = city;
      state.location = location;
      state.pageIndex = pageIndex;
      state.selectedWeatherItem = selectedWeatherItem;
      state.tempUnit = tempUnit;
    },
  },
});

export const {
  setCity,
  setNextPage,
  setPreviousPage,
  setSelectedWeatherItem,
  setTempUnit,
  setLocation,
  setUserWeatherInfo,
} = weatherSlice.actions;

export default weatherSlice.reducer;
