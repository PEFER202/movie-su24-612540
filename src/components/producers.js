import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducers } from "../redux/movieSlice";
import { Link } from "react-router-dom";

const MyProducers = () => {
  const dispatch = useDispatch();
  const producers = useSelector((state) => state.movies.producers);
  const producersStatus = useSelector((state) => state.movies.producersStatus);

  useEffect(() => {
    if (producersStatus === "idle") {
      dispatch(fetchProducers());
    }
  }, [producersStatus, dispatch]);

  return (
    <div className="categories col-md-2">
      <h3>Producers</h3>
      <ul className="category-list">
        {producers.length > 0 ? (
          producers.map((producer, index) => (
            <li key={index} className="category-item">
              <Link
                key={index}
                className="nav-link"
                aria-current="page"
                to={`/movies/?producer-id=${producer.id}`}
              >
                {producer.name}
              </Link>
            </li>
          ))
        ) : (
          <p>Loading producers...</p>
        )}
      </ul>
    </div>
  );
};

export default MyProducers;
