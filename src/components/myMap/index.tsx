import React, { useEffect, useState } from "react";
import { useGetCurrentCoords } from "hooks";
import Map from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww";

type CustomMap = {
  children?;
  coords?: number[];
  height?: string | number;
};

export default function CustomMap({ children, coords, height = "22rem" }: CustomMap) {
  const [mapRef, setMapRef] = useState(null);
  const currCoords = useGetCurrentCoords();

  useEffect(() => {
    mapRef && mapRef.flyTo({ center: [currCoords.lng, currCoords.lat] });
  }, [currCoords]);

  useEffect(() => {
    mapRef && mapRef.flyTo({ center: coords });
  }, [coords]);

  return (
    <Map
      ref={(e) => setMapRef(e)}
      initialViewState={{
        latitude: 48.399989097932604,
        longitude: -4.486109177517903,
        zoom: 10,
        bearing: 0,
        pitch: 0,
      }}
      style={{
        height,
        minHeight: "10rem",
        maxHeight: "35rem",
        maxWidth: "90vw",
        borderRadius: 4,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
      mapboxAccessToken={TOKEN}
    >
      {children}
    </Map>
  );
}
