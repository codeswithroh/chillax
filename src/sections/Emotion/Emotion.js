import React from "react";

import { loadModels } from "../../helpers/faceApi";
import { createFaLibrary } from "../../helpers/icons";
import "./Emotion.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Switch from "react-switch";
import Camera from "../../components/Camera/Camera";

createFaLibrary();
loadModels();

function Emotion() {
  //   const [mode, setMode] = useState(true);

  return (
    <div className="Emotion">
      <Camera photoMode={true} />
    </div>
  );
}

export default Emotion;
