import { useGetPet } from "hooks";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "ui";
import css from "./index.css";

// * Este componente se encarga de guardar la URL de la img en el atom pets.
export function MyDropzone({ style, onChange }: { style?; onChange: (any) => any }) {
  const [imgURL, setImgURL] = useState(null);
  const { pictureUrl } = useGetPet();

  useEffect(() => {
    setImgURL(pictureUrl);
  }, [pictureUrl]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImgURL(reader.result);
    };
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (imgURL) onChange({ pictureUrl: imgURL });
  }, [imgURL]);

  return (
    <section className={css.root} style={style}>
      <div {...getRootProps()}>
        <input {...getInputProps()} style={{ padding: "2rem", display: "none" }} />
        <div className={css.picture}>
          <div className={css.picture__add} style={{ display: imgURL ? "none" : "block" }}>
            <Icon type="add_icon" width="3rem" height="3rem" />
          </div>
          <div className={css.picture__thumbnail}>
            <img
              className={css.thumbnail__pet}
              src={imgURL}
              style={{ display: imgURL ? "block" : "none" }}
            />
            <div className={css.layer} style={{ display: imgURL ? "grid" : "none" }}>
              <div className={css.layer__update}>
                <Icon type="modify_icon" width="3rem" height="3rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
