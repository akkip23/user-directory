import React from "react";

const Navbar = () => {
  return (
    <>
      <h2 style={NavBar}>USER DIRECTORY</h2>
    </>
  );
};

export default Navbar;

const NavBar = {
  color: "lightblue",
  paddingLeft: 10,
  fontFamily: "FontAwesome",
  letterSpacing: 4,
  wordSpacing: 2,
};
