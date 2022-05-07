import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePet } from "lib/apis";
import { useGetPet, useGetToken } from "hooks";
import { FormPet } from "components";
import { AlertWait, CardLayer, MainButton, TextTitle } from "ui";
import css from "./index.css";

export function EditarReporte() {
  const navegate = useNavigate();
  const [customAlert, setCustomAlert] = useState(undefined);
  const token = useGetToken();
  const { id } = useGetPet();

  const handleDeletePet = async () => {
    setCustomAlert(<AlertWait message="Borrando Reporte..." />);
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
        {customAlert && (
          <span style={{ margin: " 0 0 .5rem 0", display: "block" }}>{customAlert}</span>
        )}
        <div className={css.delete}>
          <a className={css.delete__report} onClick={handleDeletePet}>
            Borrar Reporte
          </a>
        </div>
      </CardLayer>
    </section>
  );
}
