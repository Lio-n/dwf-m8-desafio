import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToken } from "hooks";
import { MainTextField, MyDropzone, Mapbox } from "components";
import { AlertError, MainButton, RadioInput, TextSpan } from "ui";
import { publishPet, updatePet } from "lib/apis";
import css from "./index.css";

const checkInputs = (pet: Pet): boolean => {
  const arrValues = Object.values(pet);
  if (!arrValues.includes("") && !arrValues.includes(undefined)) return true;
  return;
};

type FormPetProps = {
  children;
  addAlert;
  petToEdit?: Pet;
};

const defaultPet = {
  full_name: undefined,
  pictureUrl: undefined,
  breed: undefined,
  color: undefined,
  sex: undefined,
  date_last_seen: undefined,
  last_location_lat: undefined,
  last_location_lng: undefined,
  id: undefined,
  state: undefined,
};

export function FormPet({ children, addAlert, petToEdit = defaultPet }: FormPetProps) {
  const [customAlert, setCustomAlert] = useState(undefined);

  const [pet, setPet] = useState({
    full_name: undefined,
    pictureUrl: petToEdit.pictureUrl || undefined,
    breed: undefined,
    color: undefined,
    sex: undefined,
    date_last_seen: undefined,
    last_location_lat: petToEdit.last_location_lat || undefined,
    last_location_lng: petToEdit.last_location_lng || undefined,
    state: petToEdit.state || "lost",
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
    currentData();
  }, [submit]);

  const currentData = async () => {
    if (checkInputs(pet)) {
      if (petToEdit.id) {
        // $ Edit Pet
        await updatePet({ pet: { ...pet, id: petToEdit.id }, token });
      } else {
        // $ Publish Pet
        await publishPet({ pet, token });
      }
      navegate("/mis-mascotas");
    }
    setCustomAlert(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCustomAlert(addAlert);
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

  const setDateOfPet = () => new Date(petToEdit.date_last_seen).toISOString().substring(0, 10);
  const changeStateOfPet = () => setPet({ ...pet, state: pet.state == "lost" ? "found" : "lost" });

  return (
    <form onSubmit={(event) => handleSubmit(event)} style={{ display: "grid", gap: "1.25rem" }}>
      <MainTextField
        name="full_name"
        title="Nombre"
        placeholder="Boomer"
        defaultValue={petToEdit.full_name || ""}
        isEmpty={isEmpty.full_name}
      />
      <MainTextField
        name="breed"
        title="Raza"
        placeholder="Tamaskan"
        defaultValue={petToEdit.breed || ""}
        isEmpty={isEmpty.breed}
      />
      <MainTextField
        name="color"
        title="Color"
        placeholder="Gris, negro y blanco"
        defaultValue={petToEdit.color || ""}
        isEmpty={isEmpty.color}
      />
      <div className={css.form__radio}>
        <TextSpan>Sexo</TextSpan>
        <div className={css.radio__inputs}>
          <RadioInput
            name="sex"
            title="Macho"
            defaultValue="male"
            defaultChecked={petToEdit.sex === "male"}
          />
          <RadioInput
            name="sex"
            title="Hembra"
            defaultValue="female"
            defaultChecked={checkTypeSex(petToEdit.sex)}
          />
        </div>
      </div>
      <MainTextField
        name="date_last_seen"
        title="Visto por última vez"
        type="date"
        defaultValue={(petToEdit.date_last_seen && setDateOfPet()) || ""}
        isEmpty={isEmpty.date_last_seen}
      />
      <MyDropzone onChange={handleDropzoneChange} />
      {!isEmpty.pictureUrl && <AlertError message="Por favor, añade una foto." />}
      <Mapbox onChange={handleMapboxChange} />
      {!isEmpty.coords && <AlertError message="Por favor, añade una ubicación." />}

      {customAlert}
      {petToEdit.id && (
        <MainButton backgroundColor={"var(--Rubber-Ducky-Yellow)"} onClick={changeStateOfPet}>
          {`Reportar como ${pet.state == "lost" ? "encontrado" : "perdido"}`}
        </MainButton>
      )}
      {children}
    </form>
  );
}
