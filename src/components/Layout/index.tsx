import React from "react";
import { Outlet } from "react-router-dom";
import { MyHeader } from "components";

export function Layout() {
  return (
    <>
      <MyHeader />
      <Outlet />
    </>
  );
}
