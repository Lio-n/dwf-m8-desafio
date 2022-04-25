import React from "react";
import { useNavigate } from "react-router-dom";
import { CardLayer, MainButton, TextTitle } from "ui";
import { FormPet } from "components";
import css from "./index.css";

function EditarReporte() {
  const navegate = useNavigate();

  return (
    <section className={css.root}>
      <TextTitle>Editar Reporte</TextTitle>
      <CardLayer>
        <FormPet>
          <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
          <MainButton
            backgroundColor={"var(--Rubber-Ducky-Yellow)"}
            margin={"1.5rem 0"}
            onClick={() => navegate("/mis-mascotas")}
          >
            Reportar como encontrado
          </MainButton>
          <div className={css.delete}>
            <a className={css.delete__report}>Borrar Reporte</a>
          </div>
        </FormPet>
      </CardLayer>
    </section>
  );
}

export { EditarReporte };
