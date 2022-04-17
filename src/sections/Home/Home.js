import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const history = useNavigate();
  const handleMovieClick = () => {
    history("/movie/capture");
  };
  return (
    <div className="home">
      <div className="home__content">
        <div className="home__title">CHILLAX</div>
        <div className="home__sub-title">Made for having fun</div>
        {/* <div className="home__actions"> */}
        {/* <button className="home__chat">Anonymous Chat Room</button> */}
        <button onClick={handleMovieClick} className="home__movie">
          Movie based on your mood
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
