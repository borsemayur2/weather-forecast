import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { setTempUnit } from "../weatherSlice";

const tempUnits = ["celsius", "fahrenheit"];

const TempUnitSelector = () => {
  const tempUnit = useSelector((state) => state.weather.tempUnit);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setTempUnit({ tempUnit: event.target.value }));
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Temperature Unit</FormLabel>
      <RadioGroup
        row
        aria-label="tempUnit"
        name="tempUnit1"
        value={tempUnit}
        onChange={handleChange}
      >
        {tempUnits.map((_tempUnit) => (
          <FormControlLabel
            key={_tempUnit}
            value={_tempUnit}
            control={<Radio />}
            label={toTitleCase(_tempUnit)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default TempUnitSelector;
