import { searchQuery } from "lib/apis";
import * as React from "react";
import { useState, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww"; // Set your mapbox token here

export function Mapbox() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [query, setQuery] = useState("seattle");
  const [result, setResult] = useState(null);

  const search = async () => {
    const data = await searchQuery(query);
    const newResults = data.map((item) => {
      item.newCoords = [parseFloat(item.lon), parseFloat(item.lat)];
      return item;
    });
    setResult(newResults);
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        {result &&
          result.map((city, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={city.lon}
              latitude={city.lat}
              anchor="bottom"
            >
              <h2 onClick={() => setPopupInfo(city)}> PIN</h2>
            </Marker>
          ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <h1>POPUP</h1>
          </Popup>
        )}
      </Map>
      <h1 onClick={() => search()}>Buscar Seattle</h1>
    </>
  );
}
