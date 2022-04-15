import React from "react";
import { MainInput, IconEye, TextSpan } from "ui";

type InputProps = {
  name: string;
  placeholder?: string;
  title?: string;
  type?: string;
  isEmpty?: boolean;
  children?;
  defaultValue?: string;
  margin?: string;
  onChange?: (params: string) => any;
};

export default function MainTextField({
  isEmpty,
  name,
  title,
  placeholder,
  type = "text",
  children,
  defaultValue,
  margin,
}: InputProps) {
  return (
    <label style={{ margin, display: "block" }}>
      {title && <TextSpan>{title}</TextSpan>}
      <MainInput
        isEmpty={isEmpty}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {children}
    </label>
  );
}

// ! NO Modificar
export function PasswordTextField({
  isEmpty,
  name,
  title,
  placeholder,
  type = "password",
  onChange,
  children,
}: InputProps) {
  const handleChange = () => (type == "text" ? true : false);

  return (
    <>
      <label>
        {title && <TextSpan>{title}</TextSpan>}
        <label style={{ position: "relative" }}>
          <MainInput isEmpty={isEmpty} name={name} type={type} placeholder={placeholder} />
          <IconEye
            type={handleChange()}
            onEvent={() => (handleChange() ? onChange("password") : onChange("text"))}
          />
        </label>
        {children}
      </label>
    </>
  );
}
