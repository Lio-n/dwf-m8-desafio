import React, { useState } from "react";
import { useUser } from "hooks";
import { MainTextField, PasswordTextField } from "components";
import { MainButton, AlertWait } from "ui";
import { authUser, createUser, updateUser } from "lib/apis";
import { AlertError, AlertSuccess } from "ui/alerts";
import { useNavigate } from "react-router-dom";

export default function MyDataForm() {
  const navegate = useNavigate();
  const [user, setUser] = useUser();
  const [type, setType] = useState("password");
  const [customAlert, setCustomAlert] = useState(undefined);
  // Change the BorderColor of the custom input.
  const [isEmpty, setEmpty] = useState({
    full_name: true,
    password: true,
    password_2: true,
  });
  const { token, email } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData: any = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    const { full_name, password, password_2 } = dataObject;

    const isInputsOk = ![full_name, password, password_2].includes("");

    isInputsOk &&
      !(password == password_2) &&
      setCustomAlert(<AlertError message="Por favor, ingrese la misma contraseña" />);

    if (isInputsOk && password == password_2) {
      if (!!token) {
        // $ Api Update : token, full_name and password
        setUser({ ...user, full_name });
        updateUser({ token, full_name, password });
        setCustomAlert(<AlertSuccess message="¡Datos Actualizados!" />);
      } else {
        // $ Api Create : email, full_name and password [back-end : hashed the password]
        setCustomAlert(<AlertWait message="Creado usuario..." />);
        await createUser({ email, full_name, password });
        const data = await authUser({ email, password });

        if (data.token) {
          setUser({ ...user, full_name: data.full_name, token: data.token });
          navegate("/");
        }
      }
    }
    setEmpty({
      full_name: !!full_name,
      password: !!password,
      password_2: !!password_2,
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} style={{ display: "grid", gap: "1.25rem" }}>
      <MainTextField
        name="full_name"
        title="Usuario"
        placeholder="Usuario"
        isEmpty={isEmpty.full_name}
      />
      <MainTextField
        type={type}
        name="password"
        title="Contraseña"
        placeholder="Contraseña"
        isEmpty={isEmpty.password}
      />
      <PasswordTextField
        type={type}
        name="password_2"
        placeholder="Confirmar Contraseña"
        isEmpty={isEmpty.password_2}
        onChange={(val) => setType(val)}
      >
        {customAlert}
      </PasswordTextField>
      <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
    </form>
  );
}
