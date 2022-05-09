import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPet } from "components";
import { AlertWait, CardLayer, MainButton, TextTitle } from "ui";
import { useSetPet } from "hooks";

function ReportarMascota() {
  const navegate = useNavigate();
  const setPet = useSetPet();

  useEffect(() => {
    setPet({
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
    <section style={{ padding: "0 1rem 2rem" }}>
      <TextTitle>Reportar Mascota Perdida</TextTitle>
      <CardLayer>
        <FormPet addAlert={<AlertWait message="Publicando Reporte..." />}>
          <MainButton>Reportar como perdido</MainButton>
          <MainButton backgroundColor={"var(--Glacier)"} onClick={() => navegate("/mis-mascotas")}>
            Cancelar
          </MainButton>
        </FormPet>
      </CardLayer>
    </section>
  );
}

export { ReportarMascota };
