import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyPet } from "components";
import { useGetToken, useSetPet } from "hooks";
import { getOnePet, getPets } from "lib/apis";
import { TextTitle } from "ui";
import css from "./index.css";

function MisMascotas() {
  const token = useGetToken();
  const navegate = useNavigate();
  const usePet = useSetPet();
  const [pets, setPets] = useState(undefined);

  useEffect(() => {
    if (!token) navegate("/");
    getUserPets();
    // Seteo los valores de Pet a Default 'usePet'
    usePet({
      full_name: undefined,
      pictureUrl: undefined,
      breed: undefined,
      color: undefined,
      sex: undefined,
      date_last_seen: undefined,
      last_location_lat: undefined,
      last_location_lng: undefined,
    });
  }, []);

  const getUserPets = async () => {
    const resPets = await getPets(token);
    setPets(resPets);
  };

  const handleUpdatePet = async (id: number) => {
    // Get one pet and go to "/editar".
    // Set pet in the Atom Pet.
    const resPet = await getOnePet({ id, token });
    usePet(resPet);
    navegate("editar");
  };

  const renderPets = () => {
    return pets.map(({ full_name, id, pictureUrl }, index) => (
      <li key={index}>
        <MyPet full_name={full_name} id={id} pictureUrl={pictureUrl} onChange={handleUpdatePet} />
      </li>
    ));
  };

  return (
    <section className={css.root}>
      <TextTitle margin="2.5rem 0 0 0">Mis Mascotas Reportadas</TextTitle>
      {pets && <ul className={css.list}>{renderPets()}</ul>}
    </section>
  );
}

export { MisMascotas };
