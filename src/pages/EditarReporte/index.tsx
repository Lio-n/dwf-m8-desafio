import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePet } from "lib/apis";
import { useGetPet, useGetToken } from "hooks";
import { FormPet } from "components";
import { AlertWait, CardLayer, MainButton, TextTitle } from "ui";
import css from "./index.css";

export function EditarReporte() {
  const navegate = useNavigate();
  const token = useGetToken();
  const { id } = useGetPet();

  const handleDeletePet = async () => {
    console.table({ message: "Pet Deleted, Navegate to '/mis-mascotas'" });
    await deletePet({ petId: id, token });
    navegate("/mis-mascotas");
  };

  return (
    <section className={css.root}>
      <TextTitle>Editar Reporte</TextTitle>
      <CardLayer>
        <FormPet addAlert={<AlertWait message="Actualizando Reporte..." />}>
          <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
        </FormPet>
        <div className={css.delete}>
          <a className={css.delete__report} onClick={handleDeletePet}>
            Borrar Reporte
          </a>
        </div>
      </CardLayer>
    </section>
  );
}
