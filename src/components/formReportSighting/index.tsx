import React, { useEffect, useState } from "react";
import { AlertError, AlertWait, MainButton, TextSpan } from "ui";
import { MainTextField } from "components";
import { sendReport } from "lib/apis";
import { AlertSuccess } from "ui/alerts";
import css from "./index.css";

const checkInputs = (report_data: ReportSighting): boolean => {
  const arrValues = Object.values(report_data);
  if (!arrValues.includes("") && !arrValues.includes(undefined)) return true;
  return;
};

const validatePhoneNumber = (input_str) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
};

type FormReportSightingProps = {
  pet_id: number;
  published_by: number;
  pet_name: string;
};

export function FormReportSighting({ pet_id, published_by, pet_name }: FormReportSightingProps) {
  const [isEmpty, setEmpty] = useState({
    full_name: true,
    message: true,
    phone_number: true,
  });
  const [customAlert, setCustomAlert] = useState(undefined);
  const [submit, setSubmit] = useState(false);
  const [report, setReport] = useState({
    full_name: undefined,
    phone_number: undefined,
    message: undefined,
    pet_id,
    published_by,
    pet_name,
  });

  useEffect(() => {
    currentData();
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomAlert(<AlertWait message="Enviando reporte..." />);
    const formData: any = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);

    setReport({ ...report, ...dataObject });
    setEmpty({
      full_name: !!dataObject.full_name,
      phone_number: validatePhoneNumber(dataObject.phone_number),
      message: !!dataObject.message,
    });
    setSubmit(!submit);
  };

  const currentData = async () => {
    if (checkInputs(report) && isEmpty.phone_number) {
      await sendReport(report);
      setCustomAlert(<AlertSuccess message="¡Reportado con Exito!" />);
    } else {
      setCustomAlert(undefined);
    }
  };

  return (
    <form
      style={{ marginTop: "0.5rem", display: "grid", gap: "1.25rem" }}
      onSubmit={(event) => handleSubmit(event)}
    >
      <MainTextField
        name="full_name"
        title="Tu Nombre"
        height="2rem"
        placeholder="John Doe"
        isEmpty={isEmpty.full_name}
      />
      <MainTextField
        name="phone_number"
        title="Tu Teléfono"
        height="2rem"
        type="tel"
        placeholder="+5491830000"
        isEmpty={isEmpty.phone_number}
      />
      {!isEmpty.phone_number && (
        <AlertError message="Por favor, ingrese un número de teléfono válido" />
      )}
      <label>
        <TextSpan>Dondé lo viste?</TextSpan>
        <textarea
          className={css.form__textarea}
          name="message"
          style={{ borderColor: isEmpty.message ? "" : "var(--Amaranth" }}
        ></textarea>
      </label>
      {customAlert}
      <MainButton backgroundColor={"var(--Purply-Magenta)"}>Enviar</MainButton>
    </form>
  );
}
