import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPet } from "components";
import { AlertWait, MainButton } from "ui";
import { useSetPet } from "hooks";

export default function PetReportForm() {
  const navegate = useNavigate();
  const usePet = useSetPet();

  useEffect(() => {
    usePet({
      full_name: undefined,
      pictureUrl: undefined,
      breed: undefined,
      color: undefined,
      sex: undefined,
      date_last_seen: undefined,
      last_location_lat: undefined,
      last_location_lng: undefined,
      id: undefined,
      state: undefined,
    });
  }, []);

  return (
    <FormPet addAlert={<AlertWait message="Publicando Reporte..." />}>
      <MainButton>Reportar como perdido</MainButton>
      <MainButton backgroundColor={"var(--Glacier)"} onClick={() => navegate("/mis-mascotas")}>
        Cancelar
      </MainButton>
    </FormPet>
  );
}
