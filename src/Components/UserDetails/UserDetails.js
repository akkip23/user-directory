import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { WorldTimeApi, GetCurrentTimeForSelCountry } from "../API/WorldTimeApi";
import UserDetailsCard from "../UserDetailsCard/UserDetailsCard";
import UserPosts from "../UsersPosts/UserPosts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const selectedUserPost = useSelector((state) => state.posts.posts);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryTime, setCountryTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDifference, setTimeDifference] = useState(0); // Store time difference

  useEffect(() => {
    async function WorldTime() {
      const worldCountryData = await WorldTimeApi();
      setCountries(worldCountryData);
      setSelectedCountry(worldCountryData[0]);
    }
    WorldTime();
  }, []);

  useEffect(() => {
    async function fetchCountryTime() {
      if (selectedCountry) {
        const currTimeData = await GetCurrentTimeForSelCountry(selectedCountry);
        const serverTime = new Date(currTimeData?.datetime).getTime(); // Time fetched from API
        const localTime = new Date().getTime(); // Current local time
        const difference = serverTime - localTime; // Calculate time difference

        setCountryTime(currTimeData?.datetime);
        setTimeDifference(difference); // Store time difference
        setElapsedTime(0); // Reset elapsed time when new country time is set
        setIsRunning(true); // Start the timer when time is set
      }
    }
    fetchCountryTime();
  }, [selectedCountry]); // Trigger whenever selectedCountry changes

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleDropdownChange = async (event) => {
    setSelectedCountry(event.target.value);
  };

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState); // Toggle timer on button click
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
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
                <p>
                  {formatTime(elapsedTime + Math.floor(timeDifference / 1000))}
                </p>
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
