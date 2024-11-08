import Header from "./header";
import MovieList from "./movieList";
import MyProducers from "./producers";

const MyMovie = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <MyProducers />
        <MovieList />
      </div>
    </>
  );
};
export default MyMovie;
