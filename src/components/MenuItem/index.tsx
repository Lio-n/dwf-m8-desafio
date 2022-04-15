import React from "react";
import { Link } from "react-router-dom";
import css from "./index.css";
import { Icon } from "ui";

type MenuItemProps = {
  name:
    | "Iniciar Sesion"
    | "Crear Cuenta"
    | "Mis datos"
    | "Mis mascotas"
    | "Reportar mascota"
    | "Cerrar Sesion";
};

const icons = {
  "Iniciar Sesion": ["sign_in", "/login"],
  "Crear Cuenta": ["sign_up", "/login"],
  "Mis datos": ["user_icon", "/mis-datos"],
  "Mis mascotas": ["dog_icon", "/mis-mascotas"],
  "Reportar mascota": ["megaphone_icon", "/reportar"],
  "Cerrar Sesion": ["sign_out", "/"],
};

export function MenuItem({ name }: MenuItemProps) {
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
