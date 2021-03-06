// React imports
import React, { useEffect, useState } from "react";

// Third-party imports
import { useDispatch } from "react-redux";
import { Paper, InputBase, IconButton, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

// Local imports
import { useDebounce } from "../../utils/useDebounce";
import { setCity } from "../weatherSlice";
import LocationSetter from "./LocationSetter";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const CitySetter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputTerm, setInputTerm] = useState("");
  const debouncedTerm = useDebounce(inputTerm, 1000);

  useEffect(() => {
    dispatch(setCity({ city: debouncedTerm }));
  }, [debouncedTerm]);

  const handleChangeInputTerm = (event) => {
    setInputTerm(event.target.value);
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        autoComplete="on"
        autoFocus
        margin="dense"
        className={classes.input}
        inputProps={{ "aria-label": "City" }}
        placeholder="City"
        value={inputTerm}
        onChange={handleChangeInputTerm}
      />
      <IconButton onClick={() => dispatch(setCity({ city: inputTerm }))}>
        <SearchIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <LocationSetter />
    </Paper>
  );
};

export default CitySetter;
