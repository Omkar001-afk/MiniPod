import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Nav = ({ libStatus, setlibStatus }) => {
  return (
    <nav>
      <h2>Music</h2>
      <button
        onClick={() => {
          setlibStatus(!libStatus);
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
