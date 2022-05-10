import React from "react";
import css from "./index.css";
import { MyMenu } from "components";
import { Logo } from "ui";

export default function MyHeader() {
  return (
    <header className={css.header}>
      <Logo />
      <MyMenu />
    </header>
  );
}
