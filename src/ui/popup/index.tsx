import React from "react";
import { Popup } from "react-map-gl";

type CustomPopupProps = {
  pet: Pet;
  closePopup: (any) => any;
  children;
};

export function CustomPopup({ pet, closePopup, children }: CustomPopupProps) {
  return (
    <Popup
      latitude={pet.last_location_lat}
      longitude={pet.last_location_lng}
      onClose={() => closePopup(null)}
      offset={25}
    >
      {children}
    </Popup>
  );
}
