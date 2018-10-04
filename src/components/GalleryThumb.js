import React from "react";
import "../styles.css";

//component returns list of thumbnail images with delete buttons
export const GalleryThumb = props => {
  return (
    <div className="thumbnail-wrapper">
      <div className="thumbnail-gallery">
        {props.images.map((element, index) => {
          return (
            <div className="thumbnail-gallery__thumbnail" key={index}>
              <img
                className="thumbnail-gallery__thumbnail__image"
                src={element.stillURL}
                alt={element.title}
                onClick={props.selectActiveHandler.bind(this, index)}
              />
              <button
                type="button"
                className="thumbnail-gallery__thumbnail__close-button"
                onClick={props.deleteHandler.bind(this, index)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
