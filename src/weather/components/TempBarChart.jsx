import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function TempBarChart(props) {
  const selectedWeatherItem = useSelector(
    (state) => state.weather.selectedWeatherItem
  );

  return (
    <>
      {selectedWeatherItem && (
        <ResponsiveContainer width={"100%"} height={250}>
          <BarChart data={selectedWeatherItem.temperatures}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="time" />
            <YAxis dataKey="temp" />
            <Bar dataKey="temp" fill="#8884d8" barSize={20} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
