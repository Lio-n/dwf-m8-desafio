import { useGetUser } from "hooks";
import React from "react";
import css from "./index.css";

export function Home() {
  console.log(useGetUser());

  return (
    <div className={css.root}>
      <h1>HOME</h1>
    </div>
  );
}
