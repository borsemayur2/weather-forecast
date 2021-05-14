// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";
import { OPENWEATHERMAP_API_KEY, BASE_URL } from "../config";

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) =>
        `?q=${city}&units=imperial&appid=${OPENWEATHERMAP_API_KEY}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherByCityQuery } = weatherApi;
