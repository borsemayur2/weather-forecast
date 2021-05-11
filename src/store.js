import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherSlice";
import { weatherApi } from "./services/weather";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    // Add the generated reducer as a specific top-level slice
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
