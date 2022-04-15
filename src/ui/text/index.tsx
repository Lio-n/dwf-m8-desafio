import React, { CSSProperties } from "react";
type TextProps = { children: string; margin?: string; color?: string };

function TextTitle({ children, margin = "2.5rem 0", color = "var(--Ebony-Clay)" }: TextProps) {
  return <h1 style={{ color, margin, textAlign: "center" }}>{children}</h1>;
}

function TextSubTitle({ children, margin = "0 0 1rem 0", color = "var(--Ebony-Clay)" }: TextProps) {
  return <h2 style={{ color, margin, textAlign: "center" }}>{children}</h2>;
}

function TextSpan({ children, color = "var(--Ebony-Clay)" }: TextProps) {
  const style: CSSProperties = {
    display: "block",
    marginBottom: 5,
    fontWeight: 500,
    color,
  };
  return <span style={style}>{children}</span>;
}

export { TextTitle, TextSubTitle, TextSpan };
