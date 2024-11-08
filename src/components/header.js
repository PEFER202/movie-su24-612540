import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";

const Header = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const moviesStatus = useSelector((state) => state.movies.moviesStatus);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [moviesStatus, dispatch]);

  const uniqueGenres = [...new Set(movies.flatMap((movie) => movie.genres))];

  return (
    <>
      <h1 style={{ textAlign: "center", padding: "10px" }}>
        React Application
      </h1>
      <div className="Navbar">
        {uniqueGenres.length > 0 ? (
          uniqueGenres.map((genre, index) => (
            <Link
              style={{ textTransform: "uppercase" }}
              key={index}
              className="nav-link"
              aria-current="page"
              to={`/movies/?genre=${genre}`}
            >
              {genre}
            </Link>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </>
  );
};

export default Header;
