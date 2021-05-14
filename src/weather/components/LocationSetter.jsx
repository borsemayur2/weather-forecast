import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../weatherSlice";
import MessageSnackbar from "./MessageSnackbar";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { IconButton } from "@material-ui/core";

export default function LocationSetter() {
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const requestLatLong = () => {
    const onSuccess = (position) => {
      dispatch(
        setLocation({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
      );
    };
    const onError = () => {
      setMessage({
        content: "Error while fetching location. Please allow location access",
        severity: "error",
      });
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setMessage({
        content: "Location not available.",
        severity: "info",
      });
    }
  };

  useEffect(() => {
    requestLatLong();
  }, []);

  return (
    <div>
      {message && (
        <MessageSnackbar
          message={message.content}
          severity={message.severity}
        />
      )}
      <IconButton onClick={requestLatLong}>
        <MyLocationIcon />
      </IconButton>
    </div>
  );
}
