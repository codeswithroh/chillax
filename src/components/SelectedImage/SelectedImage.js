import React, { useEffect, useRef } from "react";
import { detectFaces } from "../../helpers/faceApi";

import "./SelectedImage.css";
import { useNavigate } from "react-router-dom";

const SelectedImage = ({ img }) => {
  const selected = useRef();
  const history = useNavigate();

  const getFaces = async () => {
    const faces = await detectFaces(selected.current);
    if (faces.length > 0) {
      const emotion = faces[0].expressions.asSortedArray()[0]?.expression;
      history(`/movie/show/${emotion}`);
    } else {
      history(`/movie/show/neutral`);
    }
  };

  useEffect(
    () => {
      getFaces();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="selected-image">
      <div className="selected-image__wrapper">
        <img
          ref={selected}
          src={img}
          alt="selected"
          className="selected-image__image"
        />
        {/* <canvas className="selected-image__overlay" ref={canvas} /> */}
      </div>
      {/* <div className="results__container">
        <Results results={results} processing={processing} />
      </div> */}
    </div>
  );
};

export default SelectedImage;
