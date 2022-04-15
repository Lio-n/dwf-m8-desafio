import React from "react";
import { Outlet } from "react-router-dom";
import { MyHeader } from "components";
import css from "./index.css";

export function Layout() {
  return (
    <div className={css.root}>
      <MyHeader />
      <Outlet />
    </div>
  );
}
