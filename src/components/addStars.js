import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovie, fetchStars, updateMovieStars } from "../redux/movieSlice";
import { useEffect, useState } from "react";

const AddStars = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stars = useSelector((state) => state.movies.stars);
  const movie = useSelector((state) => state.movies.movie);
  const movieStatus = useSelector((state) => state.movies.movieStatus);
  const starsStatus = useSelector((state) => state.movies.starsStatus);
  const moviesError = useSelector((state) => state.movies.error);

  const [selectedStars, setSelectedStars] = useState([]);

  useEffect(() => {
    dispatch(fetchMovie({ movieId }));
    dispatch(fetchStars());
  }, [movieId, dispatch]);

  useEffect(() => {
    if (movie && movie.stars) {
      setSelectedStars(movie.stars.map((starId) => String(starId)));
    }
  }, [movie]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedStars((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((star) => star !== value)
        : [...prevSelected, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updating movie ID:", movieId);
    console.log("Selected stars:", selectedStars);

    dispatch(updateMovieStars({ movieId: movie.id, stars: selectedStars }))
      .unwrap()
      .then(() => {
        alert("Stars updated successfully!");
        navigate("/movies");
      })
      .catch((error) => {
        alert("Failed to update stars: " + error.message);
      });
  };

  if (movieStatus === "loading" || starsStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (moviesError) {
    return <p>Error fetching movie or stars: {moviesError}</p>;
  }

  return (
    <div>
      <h1 className="add-movie-title">Add Stars to Movie</h1>
      <label>Movie Title</label>
      <input value={movie ? movie.title : "Loading..."} readOnly />
      <label>Stars</label>
      <form onSubmit={handleSubmit}>
        {stars.length > 0 ? (
          stars.map((star) => (
            <div key={star.id}>
              <input
                type="checkbox"
                id={star.id}
                value={String(star.id)}
                checked={selectedStars.includes(String(star.id))}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={star.id}>{star.fullname}</label>
            </div>
          ))
        ) : (
          <p>No stars available</p>
        )}
        {selectedStars.length === 0 && (
          <p>No stars selected. Please select at least one star.</p>
        )}
        <button type="submit" disabled={selectedStars.length === 0}>
          Save Selected Stars
        </button>
      </form>
    </div>
  );
};

export default AddStars;
