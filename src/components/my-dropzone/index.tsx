import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
const add_icon: string = require("assets/add_icon.svg");
const modify_icon: string = require("assets/modify_icon.svg");

// Este componente se encarga de guardad la URL de la img en el atom pets.
export function MyDropzone() {
  const [imgURL, setImgURL] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImgURL(reader.result);
    };
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className={css.root}>
      <div {...getRootProps()}>
        <input {...getInputProps()} style={{ padding: "2rem", display: "none" }} />
        <div className={css.picture}>
          <img
            className={css.picture__add}
            src={add_icon}
            alt="add icon"
            style={{ display: imgURL ? "none" : "block" }}
          />
          <div className={css.picture__thumbnail}>
            <img
              className={css.thumbnail__pet}
              src={imgURL}
              style={{ display: imgURL ? "block" : "none" }}
            />
            <div className={css.layer} style={{ display: imgURL ? "grid" : "none" }}>
              <img className={css.layer__update} src={modify_icon} alt="update icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
