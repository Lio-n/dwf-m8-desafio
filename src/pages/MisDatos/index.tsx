import React from "react";
import { useGetToken } from "hooks";
import { MyDataForm } from "components";
import { CardLayer, TextSubTitle } from "ui";

export default function MisDatos() {
  const token = useGetToken();
  return (
    <CardLayer type="log">
      {token ? (
        <TextSubTitle>Actualizar Mis Datos</TextSubTitle>
      ) : (
        <TextSubTitle>Crear Usuario</TextSubTitle>
      )}
      <MyDataForm />
    </CardLayer>
  );
}
