import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPet, useGetToken } from "hooks";
import { MainTextField, MyDropzone, Mapbox } from "components";
import { AlertError, RadioInput, TextSpan } from "ui";
import { publishPet } from "lib/apis";
import css from "./index.css";

const checkInputs = (pet: Pet): boolean => {
  const arrValues = Object.values(pet);
  if (!arrValues.includes("" || undefined)) return true;
  return;
};

export function FormPet({ children }) {
  const petToEdit = useGetPet(); // * 1

  const [pet, setPet] = useState({
    full_name: undefined,
    pictureUrl: undefined,
    breed: undefined,
    color: undefined,
    sex: undefined,
    date_last_seen: undefined,
    last_location_lat: undefined,
    last_location_lng: undefined,
  });
  const [submit, setSubmit] = useState(false);
  const navegate = useNavigate();
  const token = useGetToken();
  // Change the BorderColor of the custom input.
  const [isEmpty, setEmpty] = useState({
    full_name: true,
    breed: true,
    color: true,
    date_last_seen: true,
    pictureUrl: true,
    coords: true,
  });

  useEffect(() => {
    if (!token) navegate("/");
    // * Cada vez que haga un submit desde el form, ejecuto esta funcion.
    currentData();
  }, [submit]);

  const currentData = async () => {
    if (checkInputs(pet)) {
      // $ Edit Pet
      if (petToEdit) {
      }
      // $ Publish Pet
      await publishPet({ pet, token });
      navegate("/mis-mascotas");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData: any = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);

    setPet({ ...pet, ...dataObject });
    setEmpty({
      full_name: !!dataObject.full_name,
      breed: !!dataObject.breed,
      color: !!dataObject.color,
      date_last_seen: !!dataObject.date_last_seen,
      coords: !!pet.last_location_lat,
      pictureUrl: !!pet.pictureUrl,
    });
    setSubmit(!submit);
  };

  const handleMapboxChange = ({ coords }) =>
    setPet({ ...pet, last_location_lng: coords[0], last_location_lat: coords[1] });
  const handleDropzoneChange = ({ pictureUrl }) => setPet({ ...pet, pictureUrl });

  const checkTypeSex = (sex) => {
    if ((sex !== "female" && sex !== "male") || sex === "female") return true;
    return;
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <MainTextField
        name="full_name"
        title="Nombre"
        placeholder="Boomer"
        margin="0 0 1.25rem 0"
        defaultValue={petToEdit.full_name || ""}
        isEmpty={isEmpty.full_name}
      />
      <MainTextField
        name="breed"
        title="Raza"
        placeholder="Tamaskan"
        margin="0 0 1.25rem 0"
        defaultValue={petToEdit.breed || ""}
        isEmpty={isEmpty.breed}
      />
      <MainTextField
        name="color"
        title="Color"
        placeholder="Gris, negro y blanco"
        margin="0 0 1.25rem 0"
        defaultValue={petToEdit.color || ""}
        isEmpty={isEmpty.color}
      />
      <div className={css.form__radio}>
        <TextSpan>Sexo</TextSpan>
        <div className={css.radio__inputs}>
          {}
          <RadioInput
            name="sex"
            title="Macho"
            defaultValue="male"
            defaultChecked={checkTypeSex(petToEdit.sex)}
          />
          <RadioInput
            name="sex"
            title="Hembra"
            defaultValue="female"
            defaultChecked={petToEdit.sex === "male"}
          />
        </div>
      </div>
      <MainTextField
        name="date_last_seen"
        title="Visto por última vez"
        type="date"
        margin="0 0 1.25rem 0"
        defaultValue={new Date(petToEdit.date_last_seen).toISOString().substring(0, 10) || ""}
        isEmpty={isEmpty.date_last_seen}
      />
      <MyDropzone onChange={handleDropzoneChange} style={{ marginBottom: "1.25rem" }} />
      {!isEmpty.pictureUrl && (
        <AlertError
          message="Por favor, añade una foto."
          AlertStyle={{ fontStyle: "italic", fontWeight: 600, marginBottom: "1.25rem" }}
        />
      )}
      <Mapbox onChange={handleMapboxChange} />
      {!isEmpty.coords && (
        <AlertError
          message="Por favor, añade una ubicación."
          AlertStyle={{ fontStyle: "italic", fontWeight: 600, marginBottom: "1.25rem" }}
        />
      )}
      {children}
    </form>
  );
}
