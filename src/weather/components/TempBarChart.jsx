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
import { Typography } from "@material-ui/core";

export default function TempBarChart(props) {
  const selectedWeatherItem = useSelector(
    (state) => state.weather.selectedWeatherItem
  );

  return (
    <>
      {selectedWeatherItem && (
        <>
          <Typography
            style={{ textAlign: "center", color: "gray" }}
            variant="h6"
          >
            {selectedWeatherItem.date}
          </Typography>
          <ResponsiveContainer width={"100%"} height={250}>
            <BarChart data={selectedWeatherItem.temperatures}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="time" />
              <YAxis dataKey="temp" width={30} />
              <Bar dataKey="temp" fill="#abbbaf" barSize={20} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
}
