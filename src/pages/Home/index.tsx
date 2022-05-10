import React from "react";
import { ShowPets } from "components";
import { useSetCurrentCoords } from "hooks";
import { MainButton, TextTitle } from "ui";
import css from "./index.css";

export default function Home() {
  const setCurrCoords = useSetCurrentCoords();

  const handleCurrentCoords = () => {
    navigator.geolocation.getCurrentPosition((geo) => {
      const { longitude, latitude } = geo.coords;
      setCurrCoords({ lng: longitude, lat: latitude });
    });
  };

  return (
    <div>
      <div className={css.root__location}>
        <TextTitle margin="0 0 1.5rem">
          Solo puedes reportar mascotas cerca de tu ubicación
        </TextTitle>
        <MainButton onClick={handleCurrentCoords}>Dar mi ubicación</MainButton>
      </div>
      <div className={css.root__map_box}>
        <ShowPets />
      </div>
    </div>
  );
}
