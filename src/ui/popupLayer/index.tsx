import React from "react";
import { CustomPopup } from "ui";
import css from "./index.css";

type PopupLayerProps = {
  pet: Pet;
  onClick: (any) => any;
  type?: "default" | "report";
  children?;
};

export function PopupLayer({ pet, onClick, type = "default", children }: PopupLayerProps) {
  const date = new Date(pet.date_last_seen).toISOString().substring(0, 10);

  return (
    <CustomPopup coords={[pet.last_location_lat, pet.last_location_lng]} closePopup={onClick}>
      <div className={css.card__picture}>
        <div className={css.picture__layer}>
          <p>
            <strong>Nombre: </strong> {pet.full_name}
          </p>
          <p>
            {type == "report" ? (
              <span>
                <strong>Color: </strong>
                {pet.color}
              </span>
            ) : (
              <span>
                <strong>Raza: </strong>
                {pet.breed}
              </span>
            )}
          </p>
          <p>
            {type == "report" ? (
              <span>
                <strong>Sexo: </strong>
                {pet.sex == "male" ? "Macho" : "Hembra"}
              </span>
            ) : (
              <span>
                <strong>Visto por última vez: </strong>
                {date}
              </span>
            )}
          </p>
        </div>
        <img className={css.picture__thumbnail} src={pet.pictureUrl} />
      </div>
      {children}
    </CustomPopup>
  );
}
