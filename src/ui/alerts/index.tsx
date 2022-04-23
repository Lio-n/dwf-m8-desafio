import React, { CSSProperties } from "react";
const style: CSSProperties = { display: "block", textAlign: "center" };

function AlertWait({ message }: { message: string }) {
  return <span style={{ ...style, color: "var(--Mist-Blue)" }}>{message}</span>;
}

function AlertError({ message, AlertStyle }: { message: string; AlertStyle?: CSSProperties }) {
  return <span style={{ ...style, color: "var(--Amaranth)", ...AlertStyle }}>{message}</span>;
}

function AlertSuccess({ message }: { message: string }) {
  return <span style={{ ...style, color: "var(--Paris-Green)" }}>{message}</span>;
}

export { AlertWait, AlertError, AlertSuccess };
