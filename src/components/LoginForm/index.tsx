import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetEmail } from "hooks";
import { AlertWait, MainButton } from "ui";
import { checkUser } from "lib/apis";
import { MainTextField } from "components";

export default function LoginFrom() {
  const navegate = useNavigate();
  const setEmail = useSetEmail();
  const [isEmpty, setEmpty] = useState(true);
  const [customAlert, setCustomAlert] = useState(undefined);

  const validateEmail = (email): boolean => {
    const res =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!!email && validateEmail(email)) {
      setCustomAlert(<AlertWait message="Por favor, espere..." />);
      setEmail(email);

      !isEmpty && setEmpty(true);
      const exists = await checkUser({ email });

      exists ? navegate("password") : navegate("/mis-datos");
    } else {
      setEmpty(false);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} style={{ display: "grid", gap: "1.25rem" }}>
      <MainTextField
        name="email"
        title="Email"
        placeholder="john.doe@example.com..."
        isEmpty={isEmpty}
      >
        {customAlert}
      </MainTextField>
      <MainButton backgroundColor="var(--Muted-Blue)">Ingresar</MainButton>
    </form>
  );
}
