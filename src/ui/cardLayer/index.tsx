import React, { CSSProperties } from "react";
import css from "./index.css";

type CardLayerProps = {
  children: object;
  type?: "log" | "default";
};

export default function CardLayer({ children, type = "default" }: CardLayerProps) {
  const style: CSSProperties =
    type == "default" ? { padding: "1rem" } : { padding: "1.25rem 1.8rem", width: "22rem" };

  return (
    <div className={css.root} style={{ ...style, position: "relative" }}>
      {children}
    </div>
  );
}
