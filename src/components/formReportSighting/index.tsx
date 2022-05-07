import React from "react";
import css from "./index.css";

export function FormReportSighting({ pet }: { pet: Pet }) {
  return <div>{pet.full_name}</div>;
}
