import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { WorldTimeApi, GetCurrentTimeForSelCountry } from "../API/WorldTimeApi";
import UserDetailsCard from "../UserDetailsCard/UserDetailsCard";
import UserPosts from "../UsersPosts/UserPosts";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const selectedUserPost = useSelector((state) => state.posts.posts);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryTime, setCountryTime] = useState(null);
  const [modifiedTime, setModifiedTime] = useState("00:00:00");

  useEffect(() => {
    async function WorldTime() {
      const worldCountryData = await WorldTimeApi();
      console.log(worldCountryData);
      setCountries(worldCountryData);
      setSelectedCountry(worldCountryData[0]);
    }
    WorldTime();
  }, []);

  useEffect(() => {
    async function fetchCountryTime() {
      if (selectedCountry) {
        const currTimeData = await GetCurrentTimeForSelCountry(selectedCountry);
        setCountryTime(currTimeData?.datetime); // Update countryTime with the fetched datetime
      }
    }
    fetchCountryTime();
  }, [selectedCountry]); // Trigger whenever selectedCountry changes

  const handleDropdownChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log(countryTime);

    const dateTime = new Date(countryTime);

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    formatTime(timeInSeconds);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let lund = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    setModifiedTime(lund);
    console.log("lund", lund);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        <div className="border">
          <div className="userDetails-container">
            {/* <div className="reditrect_back">
              <button>Back</button>
            </div> */}
            <div className="country_selector">
              <select onChange={handleDropdownChange}>
                {countries.map((country) => (
                  <option value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="Timer-container">
              <div className="current-country-time">
                <p>{modifiedTime}</p>
              </div>
              <div className="Timer-ccontrol">
                <button>Pause/Start</button>
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
