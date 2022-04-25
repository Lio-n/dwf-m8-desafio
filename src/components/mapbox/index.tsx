// * Este Custom MapBox solo se utiliza para buscar una ubicacion
// * setear un markador, en esa ubicacion y devolver las coords

import React, { useEffect, useState } from "react";
import { searchQuery } from "lib/apis";
import { CustomMap } from "ui/map";
import { Marker } from "react-map-gl";
import css from "./index.css";
import { TextSpan } from "ui";
import { useGetPet } from "hooks";

type MapBoxSearchProps = {
  coords;
  onChange: (any) => any;
};

// * Este Custom se encarga de 'retornar' las coords. Al form.
const CustomMarker = ({ coords, onChange }: MapBoxSearchProps) => {
  return (
    <Marker
      onDragEnd={({ lngLat }) => onChange({ coords: [lngLat.lng, lngLat.lat] })}
      draggable
      latitude={coords[1]}
      longitude={coords[0]}
    />
  );
};

export function Mapbox({ onChange }: { onChange: (any) => any }) {
  const [marker, setMarker] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const { last_location_lat, last_location_lng } = useGetPet(); // * 1

  // lo seteo any porque la prop "center" de Map se queja
  const initialCoords: any = [-4.486109177517903, 48.399989097932604];
  const petCoords: any = [last_location_lng, last_location_lat]; // * 2
  const [coords, setCoords] = useState(petCoords || initialCoords);

  useEffect(() => {
    if (last_location_lat) setMarker(<CustomMarker coords={petCoords} onChange={onChange} />); // * 3
  }, []);

  const search = async () => {
    if (!query) return;
    const data: any[] = await searchQuery(query);
    if (!data) return;
    const newResults = data.map((item) => {
      item.newCoords = [parseFloat(item.lon), parseFloat(item.lat)];
      return item;
    });
    setResult(newResults);
  };

  useEffect(() => {
    if (query.length > 3) search();
  }, [query]);

  const inputChangeHandler = (e) => setQuery(e.target.value);
  const keydownInputHandler = (e) => e.key == "Enter" && search();

  const resultHandler = (item) => {
    setMarker(null); // * 4
    onChange({ coords: item.newCoords });

    setMarker(<CustomMarker coords={item.newCoords} onChange={onChange} />);
    setCoords(item.newCoords);
    setResult(null); // Esto es para que se borre el historial
  };

  const renderSuggestions = () =>
    result.map((item, index) => {
      return (
        <li className={css.list__item} key={index} onClick={() => resultHandler(item)}>
          {item.display_name}
        </li>
      );
    });

  const renderInfo = () => {
    return (
      <div className={css.root__info}>
        <TextSpan fontStyle="italic" color="var(--Muted-Blue)">
          Buscá un punto de referencia para reportar a tu mascota.
        </TextSpan>
        <TextSpan fontStyle="italic" color="var(--Muted-Blue)">
          Puede ser una dirección, un barrio o una ciudad.
        </TextSpan>
      </div>
    );
  };
  return (
    <section className={css.root}>
      <div className={css.search}>
        <input
          className={css.search__input}
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
        />
        {result && <ul className={css.search__list}>{renderSuggestions()}</ul>}
      </div>
      <CustomMap coords={coords}>{marker}</CustomMap>
      {renderInfo()}
    </section>
  );
}
