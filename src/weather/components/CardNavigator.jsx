import React from "react";
import { IconButton } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch } from "react-redux";
import { setNextPage, setPreviousPage } from "../weatherSlice";

const CardNavigator = ({ pageIndex, lastPageIndex }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        style={{ visibility: pageIndex > 0 ? "visible" : "hidden" }}
        onClick={() => dispatch(setPreviousPage())}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={() => dispatch(setNextPage())}
        style={{
          visibility: pageIndex < lastPageIndex ? "visible" : "hidden",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default CardNavigator;
