import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import https from "https";
import "./MovieRecommendation.css";
import { ThreeCircles } from "react-loader-spinner";

function MovieRecommendation() {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const { emotion } = useParams();
  const [movieData, setMovieData] = useState([]);
  useEffect(
    () => {
      if (emotion === "happy") {
        const options = ["Enjoyment", "Surprise", "Trust"];
        const recommend = options[Math.floor(Math.random() * options.length)];
        axios
          .get(`https://2xyegl.deta.dev/movies/?emotion=${recommend}`, {
            httpsAgent,
          })
          .then((res) => {
            setMovieData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const options = ["Sad", "Disgust", "Anger", "Anticipation", "Fear"];
        const recommend = options[Math.floor(Math.random() * options.length)];
        axios
          .get(`https://2xyegl.deta.dev/movies/?emotion=${recommend}`, {
            httpsAgent,
          })
          .then((res) => {
            setMovieData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="MovieRecommendation">
      <div className="heading_container">
        <div className="movie_heading">
          According to our calculations your emotion is {emotion}
        </div>
        <div className="movie_sub-heading">
          Here are your top 4 recommended movies:
        </div>
      </div>
      {movieData.length > 0 ? (
        <div className="movie_container">
          {movieData.map((movie) => {
            return (
              <div className="movie_card">
                <img
                  className="movie_poster"
                  alt={"..."}
                  src={`${movie.Poster}`}
                />
                <div className="movie_title">{movie.Title}</div>
                <div className="movie_plot">{movie.Plot}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <ThreeCircles
          color="blue"
          height={110}
          width={110}
          ariaLabel="three-circles-rotating"
        />
      )}
    </div>
  );
}

export default MovieRecommendation;
