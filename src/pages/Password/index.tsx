import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "hooks";
import { authUser } from "lib/apis";
import { AlertError, AlertWait, CardLayer, MainButton } from "ui";
import { PasswordTextField } from "components";

export default function Password() {
  const navegate = useNavigate();
  const [user, setUser] = useUser();
  const [isEmpty, setEmpty] = useState(true);
  const [type, setType] = useState("password");
  const [customAlert, setCustomAlert] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (!!password) {
      setEmpty(true);
      setCustomAlert(<AlertWait message="Por favor, espere..." />);
      const { token, full_name } = await authUser({ email: user.email, password });

      if (token) {
        setUser({ ...user, token, full_name });
        navegate("/");
      }

      setCustomAlert(<AlertError message="Contraseña Incorrecta" />);
    } else {
      setEmpty(false);
    }
  };

  return (
    <CardLayer type="log">
      <form onSubmit={(event) => handleSubmit(event)} style={{ display: "grid", gap: "1.25rem" }}>
        <PasswordTextField
          type={type}
          name="password"
          title="Contraseña"
          isEmpty={isEmpty}
          onChange={(val) => setType(val)}
        >
          {customAlert}
        </PasswordTextField>
        <MainButton backgroundColor="var(--Caribbean-Green)">Guardar</MainButton>
      </form>
    </CardLayer>
  );
}
