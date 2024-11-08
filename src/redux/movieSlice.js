import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await axios.get("http://localhost:5000/movies");
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch movies data");
  }
});

// Fetch one movie
export const fetchMovie = createAsyncThunk(
  "movies/fetchMovie",
  async ({ movieId }) => {
    const response = await axios.get(`http://localhost:5000/movies/${movieId}`);
    return response.data;
  }
);

// Fetch all producers
export const fetchProducers = createAsyncThunk(
  "producers/fetchProducers",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/producers");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch producers data");
    }
  }
);

// Fetch all stars
export const fetchStars = createAsyncThunk("stars/fetchStars", async () => {
  try {
    const response = await axios.get("http://localhost:5000/stars");
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch stars data");
  }
});

// Fetch all directors
export const fetchDirectors = createAsyncThunk(
  "directors/fetchDirectors",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/directors");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch directors data");
    }
  }
);

// Add a new star
export const addNewStars = createAsyncThunk(
  "stars/addNewStars",
  async (newStar) => {
    try {
      const response = await axios.post("http://localhost:5000/stars", newStar);
      return response.data;
    } catch (error) {
      throw Error("Failed to add new star");
    }
  }
);

// Update Stars
export const updateMovieStars = createAsyncThunk(
  "movies/updateMovieStars",
  async ({ movieId, stars }, { getState }) => {
    const state = getState();
    const movie = state.movies.movies.find((movie) => movie.id === movieId);

    if (!movie) {
      throw new Error(`Movie with ID ${movieId} not found.`);
    }

    // Chuyển đổi tất cả các ngôi sao thành số
    const currentStars = movie.stars.map(Number); // Đảm bảo mọi giá trị đều là số
    const newStars = stars.map(Number); // Đảm bảo mọi giá trị mới cũng là số

    // Tạo một Set từ ngôi sao hiện tại để dễ dàng kiểm tra sự tồn tại
    const currentStarsSet = new Set(currentStars);

    // Kết hợp các ngôi sao hiện tại với ngôi sao mới mà không trùng lặp
    const updatedStars = [...currentStarsSet]; // Bắt đầu với danh sách ngôi sao hiện tại

    newStars.forEach((star) => {
      if (!currentStarsSet.has(star)) {
        updatedStars.push(star); // Chỉ thêm nếu ngôi sao chưa tồn tại
      }
    });

    // Sử dụng Set để đảm bảo không có giá trị trùng lặp
    const uniqueStars = Array.from(new Set(updatedStars));

    try {
      const response = await axios.put(
        `http://localhost:5000/movies/${movieId}`,
        { ...movie, stars: uniqueStars } // Cập nhật danh sách ngôi sao
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating stars:",
        error.response ? error.response.data : error.message
      );
      throw Error("Failed to update movie stars");
    }
  }
);

// Movie slice
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    producers: [],
    directors: [],
    stars: [],
    movie: {},
    moviesStatus: "idle",
    movieStatus: "idle",
    producersStatus: "idle",
    directorsStatus: "idle",
    starsStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.moviesStatus = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesStatus = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.moviesStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.movieStatus = "loading";
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movieStatus = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.movieStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducers.pending, (state) => {
        state.producersStatus = "loading";
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.producersStatus = "succeeded";
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.producersStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStars.pending, (state) => {
        state.starsStatus = "loading";
      })
      .addCase(fetchStars.fulfilled, (state, action) => {
        state.starsStatus = "succeeded";
        state.stars = action.payload;
      })
      .addCase(fetchStars.rejected, (state, action) => {
        state.starsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDirectors.pending, (state) => {
        state.directorsStatus = "loading";
      })
      .addCase(fetchDirectors.fulfilled, (state, action) => {
        state.directorsStatus = "succeeded";
        state.directors = action.payload;
      })
      .addCase(fetchDirectors.rejected, (state, action) => {
        state.directorsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewStars.fulfilled, (state, action) => {
        state.stars.push(action.payload);
      })
      .addCase(updateMovieStars.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      });
  },
});

export default movieSlice.reducer;
