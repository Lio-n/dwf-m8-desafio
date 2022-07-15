import React from "react";
import { Icon } from "ui";
import css from "./index.css";

type MyPetProps = {
  full_name: string;
  id: number;
  pictureUrl: string;
  onChange: (id: number) => any;
};

export default function MyPet({ full_name, id, pictureUrl, onChange }: MyPetProps) {
  return (
    <div className={css.card}>
      <div className={css.pet}>
        <div className={css.pet__layer} onClick={() => onChange(id)}>
          <Icon type="update_icon" width="3rem" height="3rem" />
        </div>
        <img className={css.pet__picture} src={pictureUrl} alt={`${full_name} picture`} />
      </div>
      <h2 className={css.pet__full_name}>{full_name}</h2>
    </div>
  );
}
