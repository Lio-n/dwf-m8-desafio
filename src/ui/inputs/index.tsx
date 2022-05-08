import React from "react";
import css from "./index.css";

type InputProps = {
  name: string;
  height?: string;
  type?: string;
  isEmpty?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (params: string) => any;
};

export default function MainInput({
  isEmpty = true,
  name,
  placeholder,
  type = "text",
  defaultValue,
  height = "2.8rem",
}: InputProps) {
  return (
    <input
      style={{ borderColor: isEmpty ? "" : "var(--Amaranth)", height }}
      name={name}
      className={css.main__input}
      type={type}
      max={type == "date" ? new Date().toLocaleDateString("en-ca") : ""}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}

type RadioInputProps = { name; title; defaultValue?; defaultChecked? };
function RadioInput({ name, title, defaultValue, defaultChecked }: RadioInputProps) {
  return (
    <div className={css.radio}>
      <input
        defaultChecked={defaultChecked}
        name={name}
        id={defaultValue}
        type="radio"
        defaultValue={defaultValue}
      />
      {title && <label htmlFor={defaultValue}>{title}</label>}
    </div>
  );
}

export { RadioInput };
