import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import MyMovie from "./components/movie";
import store from "./redux/store";
import AddStars from "./components/addStars";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="/movies" element={<MyMovie />} />
            <Route path="/:movieId/add-stars" element={<AddStars />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
