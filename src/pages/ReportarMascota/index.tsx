import React from "react";
import { PetReportForm } from "components";
import { CardLayer, TextTitle } from "ui";

export default function ReportarMascota() {
  return (
    <section style={{ padding: "0 1rem 2rem" }}>
      <TextTitle>Reportar Mascota Perdida</TextTitle>
      <CardLayer>
        <PetReportForm />
      </CardLayer>
    </section>
  );
}
