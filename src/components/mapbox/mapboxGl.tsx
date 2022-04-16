// import "mapbox-gl/dist/mapbox-gl.css";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, Popup } from "react-map-gl";

const styles: CSSProperties = {
  height: 400,
};
mapboxgl.accessToken =
  "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww";

const Mapbox = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  /*  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGlvLW4iLCJhIjoiY2t6c3R2a3h1NzY5ODJzdHZuaGtxZ2RseiJ9.cLBKtC-xb9kR7UjmHofBww";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [0, 0],
        zoom: 5,
      });

      const marker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(map);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]); */

  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    </>
  );
};
