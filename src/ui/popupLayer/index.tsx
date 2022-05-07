import React from "react";
import { CustomPopup } from "ui";
import css from "./index.css";

export function PopupLayer({ pet, onClick }: { pet: Pet; onClick: (any) => any }) {
  const date = new Date(pet.date_last_seen).toISOString().substring(0, 10);

  return (
    <CustomPopup pet={pet} closePopup={onClick}>
      <div className={css.card__picture}>
        <div className={css.picture__layer}>
          <p>
            <span>Nombre: </span> {pet.full_name}
          </p>
          <p>
            <span>Raza: </span> {pet.breed}
          </p>
          <p>
            <span>Visto por última vez: </span> {date}
          </p>
        </div>
        <img className={css.picture__thumbnail} src={pet.pictureUrl} />
      </div>
    </CustomPopup>
  );
}
