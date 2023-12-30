import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./UserDetailsCard.css";

const UserDetailsCard = () => {
  const selectedUserData = useSelector((state) => state.data.userDetails);
  const {
    name,
    username,
    email,
    phone,
    company = {},
    address = {},
  } = selectedUserData || {};
  const { catchPhrase } = company;
  const { suite, street, city, zipcode } = address;

  return (
    <>
      {selectedUserData ? (
        <section className="userDetails-card">
          <div className="user-name">
            <h2>{name}</h2>
            <span>
              {username} | {catchPhrase}
            </span>
          </div>
          <div className="user-contactDetails">
            <p>
              <span>
                <i class="fa-solid fa-location-dot"></i>
              </span>
              {suite},{street},{city}, <br />
              {zipcode}.
            </p>
            <p>
              <span>
                <i class="fa-solid fa-envelope-open-text"></i>
              </span>
              {email}
            </p>
            <p>
              <span>
                <i class="fa-solid fa-phone"></i>
              </span>
              {phone}
            </p>
          </div>
        </section>
      ) : (
        // Render a loading state or alternative content if selectedUserData is not available
        <p>Loading...</p>
      )}
    </>
  );
};

export default UserDetailsCard;
