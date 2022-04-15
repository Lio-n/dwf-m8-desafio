import React from "react";
import { MainTextField, MyDropzone } from "components";
import { CardLayer, MainButton, RadioInput, TextSpan, TextTitle } from "ui";
import { Mapbox } from "components/mapbox";
import css from "./index.css";

function ReportarMascota() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData: any = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    console.log("🚀 ~ file: index.tsx ~ line 10 ~ handleSubmit ~ dataObject", dataObject);
  };

  return (
    <section className={css.root}>
      <TextTitle>Reportar Mascota Perdida</TextTitle>
      <CardLayer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <MainTextField
            name="full_name"
            title="Nombre"
            placeholder="Boomer"
            margin="0 0 1.25rem 0"
          />
          <MainTextField name="breed" title="Raza" placeholder="Tamaskan" margin="0 0 1.25rem 0" />
          <MainTextField
            name="color"
            title="Color"
            placeholder="Gris, negro y blanco"
            margin="0 0 1.25rem 0"
          />
          <div className={css.form__radio}>
            <TextSpan>Sexo</TextSpan>
            <div className={css.radio__inputs}>
              <RadioInput name="sex" title="Macho" defaultValue="male" defaultChecked />
              <RadioInput name="sex" title="Hembra" defaultValue="female" />
            </div>
          </div>
          <MainTextField
            name="date_last_seen"
            title="Visto por última vez"
            type="date"
            margin="0 0 1.25rem 0"
          />
          <MyDropzone />
          <Mapbox />
          <MainButton>Enviar</MainButton>
        </form>
      </CardLayer>
    </section>
  );
}

export { ReportarMascota };
