import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDirectors,
  fetchMovies,
  fetchProducers,
  fetchStars,
} from "../redux/movieSlice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const moviesStatus = useSelector((state) => state.movies.moviesStatus);
  const producers = useSelector((state) => state.movies.producers);
  const producersStatus = useSelector((state) => state.movies.producersStatus);
  const stars = useSelector((state) => state.movies.stars);
  const starsStatus = useSelector((state) => state.movies.starsStatus);
  const directors = useSelector((state) => state.movies.directors);
  const directorsStatus = useSelector((state) => state.movies.directorsStatus);

  // Get params from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");
  const producerId = searchParams.get("producer-id");

  useEffect(() => {
    if (producersStatus === "idle") dispatch(fetchProducers());
    if (moviesStatus === "idle") dispatch(fetchMovies());
    if (starsStatus === "idle") dispatch(fetchStars());
    if (directorsStatus === "idle") dispatch(fetchDirectors());
  }, [producersStatus, moviesStatus, starsStatus, directorsStatus, dispatch]);

  // Helper functions to get names
  const getProducerNameById = (id) => {
    const producer = producers.find((producer) => producer.id == id);
    return producer ? producer.name : "Unknown Producer";
  };

  const getDirectorNameById = (id) => {
    const director = directors.find((director) => director.id == id);
    return director ? director.fullname : "Unknown Director";
  };

  const getStarNameById = (id) => {
    const star = stars.find((star) => star.id == id);
    return star ? star.fullname : "Unknown Star";
  };

  // Filter movies based on genre and producer ID
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = genre ? movie.genres.includes(genre) : true;
    const matchesProducer = producerId ? movie.producer == producerId : true;
    return matchesGenre && matchesProducer;
  });

  return (
    <div className="col-md-10">
      <h1 className="movielist-title">
        {genre ? `Movies in Genre: ${genre}` : "All Movies"}
      </h1>
      <Link className="nav-link" to="/movies">
        Show all movies
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Release</th>
            <th>Description</th>
            <th>Producer</th>
            <th>Director</th>
            <th>Genres</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title || "Unknown Title"}</td>
                <td>{movie.release || "Unknown Release Date"}</td>
                <td>{movie.description || "No Description Available"}</td>
                <td>{getProducerNameById(movie.producer)}</td>
                <td>{getDirectorNameById(movie.director)}</td>
                <td>
                  {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                    movie.genres.map((genre, index) => (
                      <p key={index}>{genre}</p>
                    ))
                  ) : (
                    <p>No genres available</p>
                  )}
                </td>
                <td>
                  <ul style={{ padding: "0", margin: "0", listStyle: "none" }}>
                    {Array.isArray(movie.stars) && movie.stars.length > 0 ? (
                      movie.stars.map((star, index) => (
                        <li key={star}>
                          {index + 1} - {getStarNameById(star)}
                        </li>
                      ))
                    ) : (
                      <li>No stars available</li>
                    )}
                    <Link className="nav-link" to={`/${movie.id}/add-stars`}>
                      Add stars
                    </Link>
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No movies found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MovieList;
