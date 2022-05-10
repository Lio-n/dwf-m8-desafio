import React, { useEffect, useState } from "react";
import { CustomMap, FormReportSighting } from "components";
import { useGetCurrentCoords } from "hooks";
import { getAllPets, getPetsNearby } from "lib/apis";
import { CustomMarker, PopupLayer } from "ui";
import css from "./index.css";

export default function ShowPets() {
  const currCoords = useGetCurrentCoords();
  const [pets, setPets] = useState(undefined);
  const [popupInfo, setPopupInfo] = useState(null);
  const [enableForm, setEnableForm] = useState(false);

  useEffect(() => {
    !!currCoords.lng && getPetsNear();
  }, [currCoords]);

  const getPetsNear = async () => {
    const resPets = await getPetsNearby({ lat: currCoords.lat, lng: currCoords.lng });
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
          <PopupLayer type="report" pet={popupInfo} onClick={setPopupInfo}>
            {!enableForm && (
              <div className={css.report}>
                <a className={css.pet__report} onClick={() => setEnableForm(true)}>
                  Reportar
                </a>
              </div>
            )}
            {enableForm && (
              <FormReportSighting
                pet_id={popupInfo.id}
                published_by={popupInfo.published_by}
                pet_name={popupInfo.full_name}
              />
            )}
          </PopupLayer>
        )}
      </CustomMap>
    </div>
  );
}
