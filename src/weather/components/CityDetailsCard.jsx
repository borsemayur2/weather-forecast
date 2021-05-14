import React from "react";
import { Card, CardContent, CardHeader, Paper } from "@material-ui/core";
import TempUnitSelector from "./TempUnitSelector";

const CityDetailsCard = ({ data }) => {
  return (
    <Paper>
      <Card>
        <CardHeader title={data.name} subheader={data.country} />
        <CardContent>
          <TempUnitSelector />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CityDetailsCard;
