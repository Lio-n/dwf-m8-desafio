import React, { CSSProperties } from "react";

// * Icons for Menu Items
const sign_up: string = require("assets/signup_icon.svg");
const sign_in: string = require("assets/signin_icon.svg");
const sign_out: string = require("assets/signout_icon.svg");
const user_icon: string = require("assets/user_icon.svg");
const dog_icon: string = require("assets/dog_icon.svg");
const megaphone_icon: string = require("assets/megaphone_icon.svg");

const eye_open: string = require("assets/eye_open.svg");
const eye_closed: string = require("assets/eye_closed.svg");

// * Icon submenu
const arrow_down: string = require("assets/arrow_down.svg");

export default function Icon({ type }: { type: string }) {
  const arrIcons = {
    sign_up,
    sign_in,
    sign_out,
    user_icon,
    dog_icon,
    megaphone_icon,
    arrow_down,
  };

  return <img style={{ height: "1.5rem", width: "1.5rem" }} src={arrIcons[type]} />;
}

type IconEyeProps = {
  type?: boolean;
  onEvent: (params) => any;
};

export function IconEye({ type = true, onEvent }: IconEyeProps) {
  const style: CSSProperties = {
    position: "absolute",
    right: 10,
    top: "50%",
    cursor: "pointer",
    display: "block",
    transform: "translateY(-50%)",
    height: "auto",
    width: "2rem",
  };
  return <img style={style} src={type ? eye_open : eye_closed} onClick={onEvent} />;
}
