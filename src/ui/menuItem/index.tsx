import React from "react";
import { useSetUser } from "hooks";
import { Link } from "react-router-dom";
import { Icon } from "ui";
import css from "./index.css";

type MenuItemProps = {
  name: "Iniciar Sesion" | "Crear Cuenta" | "Mis datos" | "Mis mascotas" | "Reportar mascota";
};

const icons = {
  "Iniciar Sesion": ["sign_in", "/login"],
  "Crear Cuenta": ["sign_up", "/login"],
  "Mis datos": ["user_icon", "/mis-datos"],
  "Mis mascotas": ["dog_icon", "/mis-mascotas"],
  "Reportar mascota": ["megaphone_icon", "/reportar"],
};

export default function MenuItem({ name }: MenuItemProps) {
  const [typeIcon, path] = icons[name];
  return (
    <Link to={path} className={css.item}>
      <div>
        <Icon type={typeIcon} />
        <span>{name}</span>
      </div>
    </Link>
  );
}

export function SignoutItem() {
  const setUser = useSetUser();

  const handleSignout = () => {
    localStorage.removeItem("user_localData");
    setUser({
      email: undefined,
      fullname: undefined,
      token: undefined,
    });
  };

  return (
    <Link to={"/"} className={css.item} onClick={() => handleSignout()}>
      <div>
        <Icon type="sign_out" />
        <span>Cerrar Sesion</span>
      </div>
    </Link>
  );
}
