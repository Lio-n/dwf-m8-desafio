import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePet } from "lib/apis";
import { useGetPet, useGetToken } from "hooks";
import { FormPet } from "components";
import { AlertWait, MainButton } from "ui";
import css from "./index.css";

export default function EditReportForm() {
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
    <FormPet addAlert={<AlertWait message="Actualizando Reporte..." />} petToEdit={petToEdit}>
      <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
      <div className={css.delete}>
        {customAlert}
        <a className={css.delete__report} onClick={handleDeletePet}>
          Borrar Reporte
        </a>
      </div>
    </FormPet>
  );
}
