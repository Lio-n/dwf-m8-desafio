import React from "react";
import { EditReportForm } from "components";
import { CardLayer, TextTitle } from "ui";

export default function EditarReporte() {
  return (
    <section style={{ padding: "0 1rem 2rem" }}>
      <TextTitle>Editar Reporte</TextTitle>
      <CardLayer>
        <EditReportForm />
      </CardLayer>
    </section>
  );
}
