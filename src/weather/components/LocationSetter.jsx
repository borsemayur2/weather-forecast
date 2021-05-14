import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../weatherSlice";
import MessageSnackbar from "./MessageSnackbar";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { IconButton } from "@material-ui/core";

export default function LocationSetter() {
  const [error, setError] = useState();

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
      setError("Error while fetching location. Please allow location access");
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setError("Location not available.");
    }
  };

  useEffect(() => {
    requestLatLong();
  }, []);

  return (
    <div>
      {error && <MessageSnackbar message={error} severity="error" />}
      <IconButton onClick={requestLatLong}>
        <MyLocationIcon />
      </IconButton>
    </div>
  );
}
