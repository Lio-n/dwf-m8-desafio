import React, { useEffect, useState } from "react";
import Map from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww";

type CustomMap = {
  children?;
  coords?: number[];
};

export function CustomMap({ children, coords }: CustomMap) {
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    mapRef && mapRef.flyTo({ center: coords });
  }, [coords]);

  return (
    <Map
      ref={(e) => setMapRef(e)}
      initialViewState={{
        latitude: coords[1] || -4.486109177517903,
        longitude: coords[0] || 48.399989097932604,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      style={{ height: "22rem", minHeight: "10rem", borderRadius: 4 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={TOKEN}
    >
      {children}
    </Map>
  );
}
