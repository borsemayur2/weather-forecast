import React from "react";
import { useSelector } from "react-redux";
import { getWeatherListByDays } from "../../utils/getWeatherListByDays";
import CardNavigator from "./CardNavigator";
import CityDetailsCard from "./CityDetailsCard";
import WeatherCardList from "./WeatherCardList.jsx";
import TempBarChart from "./TempBarChart";

export default function WeatherForecast({ getWeatherQuery }) {
  const tempUnit = useSelector((state) => state.weather.tempUnit);
  const pageIndex = useSelector((state) => state.weather.pageIndex);

  const { data, error, isLoading, isFetching, isSuccess, isError } =
    getWeatherQuery();

  if (isError) {
    return error.data?.message || error.message;
  }
  if (isLoading) return "loading...";
  if (isFetching) return "fetching...";
  if (!isSuccess) return "Error while fetching weather";

  const cardsPerPage = 2;
  const pageStart = pageIndex * cardsPerPage;
  const pageEnd = pageStart + cardsPerPage;

  const weatherList = getWeatherListByDays(data.list, tempUnit);
  const weatherItems = weatherList.slice(pageStart, pageEnd);

  const lastPageIndex = Math.floor((weatherList.length - 1) / cardsPerPage);

  return (
    <div style={{ marginTop: 10 }}>
      <CityDetailsCard data={data.city} />
      <CardNavigator pageIndex={pageIndex} lastPageIndex={lastPageIndex} />
      <WeatherCardList weatherItems={weatherItems} tempUnit={tempUnit} />
      <TempBarChart />
    </div>
  );
}
