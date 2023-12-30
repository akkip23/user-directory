import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { WorldTimeApi, GetCurrentTimeForSelCountry } from "../API/WorldTimeApi";
import UserDetailsCard from "../UserDetailsCard/UserDetailsCard";
import UserPosts from "../UsersPosts/UserPosts";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const UserDetails = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [countryTime, setCountryTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    async function WorldTime() {
      const worldCountryData = await WorldTimeApi();
      setCountries(worldCountryData);
      fetchCountryTime(worldCountryData[0]);
    }
    WorldTime();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      console.log("interval", interval);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const fetchCountryTime = async (country) => {
    const currTimeData = await GetCurrentTimeForSelCountry(country);
    const serverTime = new Date(currTimeData?.datetime);
    const abbreviationOffset = currTimeData?.datetime.slice(-6);

    const hoursUTC = serverTime.getUTCHours();
    const minutesUTC = serverTime.getUTCMinutes();
    const secondsUTC = serverTime.getUTCSeconds();

    const offsetHours = parseInt(abbreviationOffset.slice(1, 3));
    const offsetMinutes = parseInt(abbreviationOffset.slice(4));

    const newHours = hoursUTC + offsetHours;
    const newMinutes = minutesUTC + offsetMinutes;

    const adjustedHours = newHours + Math.floor(newMinutes / 60);
    const adjustedMinutes = newMinutes % 60;
    const finalHours = adjustedHours % 24;

    const timeString = `${finalHours
      .toString()
      .padStart(2, "0")}:${adjustedMinutes
      .toString()
      .padStart(2, "0")}:${secondsUTC.toString().padStart(2, "0")}`;

    setCountryTime(timeString);
    setIsRunning(true);

    const currentTime = new Date();
    const difference = Math.floor((currentTime - serverTime) / 1000);

    setElapsedTime(difference);

    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleDropdownChange = async (event) => {
    setIsRunning(false);
    fetchCountryTime(event.target.value);
  };

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <div className="userDetails-Container">
        <div className="border">
          <div className="navigate-back" onClick={() => navigate("/")}>
            <i class="fa-solid fa-arrow-left-long"></i> <span>Go back</span>
          </div>
          <div className="userDetails-container">
            <div className="country_selector">
              <select onChange={handleDropdownChange}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="Timer-container">
              <div className="current-country-time">
                <p>{countryTime}</p>
              </div>
              <div className="Timer-ccontrol">
                <button onClick={toggleTimer}>
                  {isRunning ? "Pause" : "Start"}
                </button>
              </div>
            </div>
          </div>
          <UserDetailsCard />
          <section className="users-posts">
            <UserPosts />
          </section>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
