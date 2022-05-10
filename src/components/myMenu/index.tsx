import React from "react";
import { useGetToken, useGetUser } from "hooks";
import { Icon, MenuItem, SignoutItem } from "ui";
import css from "./index.css";

// # En base al (TOKEN ? isLogged = true : isLogged = false)
// # Se habilita un tipo de menu u otro.

function UserLogged() {
  return (
    <>
      <MenuItem name="Mis datos" />
      <MenuItem name="Mis mascotas" />
      <MenuItem name="Reportar mascota" />
      <SignoutItem />
    </>
  );
}

function Default() {
  return (
    <>
      <MenuItem name="Iniciar Sesion" />
      <MenuItem name="Crear Cuenta" />
    </>
  );
}

export default function MyMenu() {
  const token = useGetToken();
  const { full_name } = useGetUser();
  return (
    <>
      <div className={css.main__menu}>
        {full_name ? <h2 className={css.full_name}>{full_name}</h2> : ""}
        <Icon type="arrow_down" />
      </div>
      <div className={css.sub__menu}>{token ? <UserLogged /> : <Default />}</div>
    </>
  );
}
