import React, { CSSProperties, useState } from "react";
import css from "./index.css";

type MainButtonProps = {
  children: string;
  backgroundColor?: string;
};

export default function MainButton({
  children,
  backgroundColor = "var(--Muted-Blue)",
}: MainButtonProps) {
  const style: CSSProperties = {
    backgroundColor,
    color: "var(--White)",
    border: `${backgroundColor} 2px solid`,
  };
  const [changeColors, setColors] = useState(style);

  const changeColor = (bool: boolean): void => {
    !bool
      ? setColors(style)
      : setColors({
          backgroundColor: "transparent",
          color: backgroundColor,
          border: `${backgroundColor} 2px solid`,
        });
  };

  return (
    <button
      className={css.root}
      style={changeColors}
      onMouseEnter={() => changeColor(true)}
      onMouseLeave={() => changeColor(false)}
    >
      {children}
    </button>
  );
}
