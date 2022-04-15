import React from "react";
import { Link } from "react-router-dom";
const paw_favicon = require("assets/paw_favicon.svg");

export function Logo() {
  return (
    <Link to="/" style={{ display: "contents" }}>
      <img
        style={{ height: "3rem", width: "3rem", cursor: "pointer" }}
        src={paw_favicon}
        alt="logo"
      />
    </Link>
  );
}
