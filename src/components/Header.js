import React from "react";
import Nav from "./Nav";
import PropTypes from "prop-types";

function Header({ userName }) {
  return (
    <header className="bg-xmrgray-darker p-4">
      <Nav userName={userName} />
    </header>
  );
}
Header.propTypes = {
  userName: PropTypes.string,
};

export default Header;
