import React from "react";
import { Popup } from "react-map-gl";

type CustomPopupProps = {
  coords: number[];
  closePopup: (any) => any;
  children;
};

export function CustomPopup({ coords, closePopup, children }: CustomPopupProps) {
  return (
    <Popup latitude={coords[0]} longitude={coords[1]} onClose={() => closePopup(null)} offset={25}>
      {children}
    </Popup>
  );
}
