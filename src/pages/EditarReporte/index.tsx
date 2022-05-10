import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePet } from "lib/apis";
import { useGetPet, useGetToken } from "hooks";
import { FormPet } from "components";
import { AlertWait, CardLayer, MainButton, TextTitle } from "ui";
import css from "./index.css";

export default function EditarReporte() {
  const navegate = useNavigate();
  const [customAlert, setCustomAlert] = useState(undefined);
  const token = useGetToken();
  const petToEdit = useGetPet();

  const handleDeletePet = async () => {
    setCustomAlert(<AlertWait message="Borrando Reporte..." />);
    await deletePet({ petId: petToEdit.id, token });
    navegate("/mis-mascotas");
  };

  return (
    <section className={css.root}>
      <TextTitle>Editar Reporte</TextTitle>
      <CardLayer>
        <FormPet addAlert={<AlertWait message="Actualizando Reporte..." />} petToEdit={petToEdit}>
          <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
          <div className={css.delete}>
            {customAlert}
            <a className={css.delete__report} onClick={handleDeletePet}>
              Borrar Reporte
            </a>
          </div>
        </FormPet>
      </CardLayer>
    </section>
  );
}
