import React, { useState, useEffect, useRef } from "react";

import { detectFaces } from "../../helpers/faceApi";
import Gallery from "../Gallery/Gallery";
import Webcam from "react-webcam";

import "./Camera.css";

const Camera = ({ photoMode }) => {
  const camera = useRef();

  const [photo, setPhoto] = useState(undefined);

  const [photos, setPhotos] = useState([]);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      console.log(faces);
    }
  };

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearInterval(ticking);
      };
    } else {
      return;
    }
  }, [photoMode]);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
  };

  const deleteImage = (target) => {
    const newPhotos = photos.filter((photo) => {
      return photo !== target;
    });
    setPhotos(newPhotos);
  };

  return (
    <>
      <div className="camera">
        <div>
          <div>
            <Webcam audio={false} ref={camera} className="webcam" />
          </div>
          <div>
            <button onClick={capture} className="camera__button--snap">
              Capture
            </button>
          </div>
        </div>
      </div>
      {photos.length > 0 && (
        <div style={{ opacity: "0" }}>
          <Gallery
            photos={photos}
            selected={photo}
            show={"Hide"}
            deleteImage={deleteImage}
          />
        </div>
      )}
    </>
  );
};

export default Camera;
