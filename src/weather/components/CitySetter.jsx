import React, { useEffect, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { setCity } from "../weatherSlice";
import { useDispatch } from "react-redux";

const CitySetter = () => {
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
    <>
      <input value={inputTerm} onChange={handleChangeInputTerm} />
    </>
  );
};

export default CitySetter;
