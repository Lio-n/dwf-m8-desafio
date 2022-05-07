import React, { useEffect, useState } from "react";
import { CustomMap, FormReportSighting } from "components";
import { useGetCurrentCoords } from "hooks";
import { getAllPets, getPetsNearby } from "lib/apis";
import { CustomPopup, CustomMarker, PopupLayer } from "ui";
import css from "./index.css";

export function ShowPets() {
  const currCoords = useGetCurrentCoords();
  const [pets, setPets] = useState(undefined);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    !!currCoords.lng && getPetsNear();
  }, [currCoords]);

  const getPetsNear = async () => {
    const resPets = await getPetsNearby(currCoords.lat, currCoords.lng);
    setPets({ resPets, areNearby: true });
  };

  const renderPetsMarker = () => {
    return pets.resPets.map((item, index) => (
      <div key={index}>
        <CustomMarker index={index} pet={item} setPopupInfo={setPopupInfo}>
          <div className={css.pet__marker}>
            <img className={css.pet__picture} src={item.pictureUrl} />
          </div>
        </CustomMarker>
      </div>
    ));
  };

  const getPets = async () => {
    const resPets = await getAllPets();
    setPets({ resPets, areNearby: false });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className={css.root}>
      <CustomMap height={"88vh"}>
        {pets && renderPetsMarker()}
        {!pets?.areNearby && popupInfo && <PopupLayer pet={popupInfo} onClick={setPopupInfo} />}
        {pets?.areNearby && popupInfo && (
          <CustomPopup pet={popupInfo} closePopup={setPopupInfo}>
            <FormReportSighting pet={popupInfo} />
          </CustomPopup>
        )}
      </CustomMap>
    </div>
  );
}
