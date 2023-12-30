import React from "react";
import axios from "axios";

export const WorldTimeApi = async () => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/timezone");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetCurrentTimeForSelCountry = async (location) => {
  try {
    const response = await axios.get(
      `http://worldtimeapi.org/api/timezone/${location}`
    );
    console.log(response.data);
    // debugger;
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
