import React from "react";
import { Marker } from "react-map-gl";

type CustomMarkerProps = {
  index: number;
  pet: Pet;
  setPopupInfo: (any) => any;
  children;
};

export default function CustomMarker({ index, pet, setPopupInfo, children }: CustomMarkerProps) {
  return (
    <Marker
      key={index}
      longitude={pet.last_location_lng}
      latitude={pet.last_location_lat}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo(pet);
      }}
    >
      {children}
    </Marker>
  );
}
