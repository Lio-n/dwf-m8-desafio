import React from "react";
import { useNavigate } from "react-router-dom";
import { FormPet } from "components";
import { CardLayer, MainButton, TextTitle } from "ui";

function ReportarMascota() {
  const navegate = useNavigate();

  return (
    <section style={{ padding: "0 1rem 2rem" }}>
      <TextTitle>Reportar Mascota Perdida</TextTitle>
      <CardLayer>
        <FormPet>
          <MainButton>Reportar como perdido</MainButton>
          <MainButton
            backgroundColor={"var(--Glacier)"}
            margin={"1.5rem 0 0 0"}
            onClick={() => navegate("/mis-mascotas")}
          >
            Cancelar
          </MainButton>
        </FormPet>
      </CardLayer>
    </section>
  );
}

export { ReportarMascota };
