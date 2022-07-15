import React, { useEffect, useState } from "react";
import { CustomMap, FormReportSighting } from "components";
import { useCurrentCoords } from "hooks";
import { getAllPets, getPetsNearby } from "lib/apis";
import { CardLayer, CustomMarker, PopupLayer, TextSubTitle } from "ui";
import css from "./index.css";

const arrayIsEmpty = (array) => {
  if (Array.isArray(array) && array.length == 0) return true;
  return;
};

export default function ShowPets() {
  const [currCoords, setCurrCoords] = useCurrentCoords();
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
            <img
              className={css.pet__picture}
              src={item.pictureUrl}
              alt={`${item.full_name} picture`}
            />
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
    return () => {
      setCurrCoords({ lat: undefined, lng: undefined });
    };
  }, []);

  return (
    <div className={css.root}>
      {pets !== undefined && arrayIsEmpty(pets?.resPets) && (
        <>
          <div className={css.layer__background}></div>
          <div className={css.layer}>
            <CardLayer>
              <div className={css.layer__close_btn} onClick={() => setPets(undefined)}></div>
              <TextSubTitle margin="0">
                No hay mascotas reportadas cerca de tu ubicación
              </TextSubTitle>
            </CardLayer>
          </div>
        </>
      )}
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
