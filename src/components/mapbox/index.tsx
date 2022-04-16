import "mapbox-gl/dist/mapbox-gl.css";
import { searchQuery } from "lib/apis";
import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from "react-mapbox-gl";
import css from "./index.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww",
});

type MapBoxSearchProps = {
  onChange?: (any) => any;
};

export function Mapbox(props: MapBoxSearchProps) {
  const { onChange } = props;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // lo seteo any porque la prop "center" de Map se queja
  const initialCoords: any = [-4.486109177517903, 48.399989097932604];
  const [coords, setCoords] = useState(initialCoords);

  async function search() {
    const data = await searchQuery(query);
    const newResults = data.map((item) => {
      item.newCoords = [parseFloat(item.lon), parseFloat(item.lat)];
      return item;
    });

    setPopupInfo({ coords: newResults[0].newCoords, city_name: newResults[0].display_name });

    setResult(newResults);

    // lo "tiro" hacia arriba para que reciban las coordenadas desde "afuera"
    /* if (onChange) {
      onChange({
        query: query,
        coords: newCoords,
      });
    } */
  }

  const inputChangeHandler = (e) => setQuery(e.target.value);

  const keydownInputHandler = (e) => e.key == "Enter" && search();

  const resultHandler = (item) => {
    setCoords(item.newCoords);
    setResult(null);
  };

  return (
    <div>
      <div className={css.search}>
        <input
          className={css.search__input}
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
        />
        <button className={css.search__btn} onClick={search}>
          Buscar
        </button>

        <ul className={css.search__list}>
          {result &&
            result.map((item) => (
              <li
                className={css.list__item}
                key={item.place_id}
                onClick={() => resultHandler(item)}
              >
                {item.display_name}
              </li>
            ))}
        </ul>
      </div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "300px",
          width: "300px",
        }}
        zoom={[15]}
        center={coords}
        movingMethod="easeTo"
      >
        {popupInfo && (
          <Marker anchor="top" coordinates={popupInfo.coords}>
            <h2>Marker</h2>
          </Marker>
        )}

        <Popup anchor="top" coordinates={coords}>
          <h1>POPUP</h1>
        </Popup>
      </Map>
    </div>
  );
}
// {popupInfo && <Popup anchor="top" coordinates={popupInfo.coords}></Popup>}
