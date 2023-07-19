import "./App.css";
import Create from "./Components/CreatePage/Create";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navabar/Navbar";
import { Routes, Route } from "react-router-dom";
import List from "./Components/SinglePages/List";
import Single from "./Components/SinglePages/Single";
import Footer from "./Components/Home/Footer";
import LikeList from "./Components/SinglePages/LikeList";
import { useEffect, useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import SavedList from "./Components/SinglePages/SavedList";
import SearchList from "./Components/SinglePages/SearchList";
import StripeContainer from "./Components/Stripe/StripeContainer";
import StripeComponent from "./Components/Stripe/StripeComponent";

function App() {
  const [loadingInProgress, setLoading] = useState(true);

  useEffect(() => {
    function getme() {
      setTimeout(() => {
        setLoading(false);
      }, 2800);
    }
    getme();
  }, []);

  return (
    <div className="container">
      {loadingInProgress ? (
        <div className="loader-container">
          <CircleLoader color="#fcf5ee" size={100} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div>
                  <Home />
                </div>
              }
            />

            <Route exact path="/liked" element={<LikeList />} />
            <Route exact path="/saved" element={<SavedList />} />
            <Route exact path="/search/:id" element={<SearchList />} />
            <Route exact path="/liked/single/:postID" element={<Single />} />
            <Route exact path="/saved/single/:postID" element={<Single />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/country/:id" element={<List />} />
            <Route
              exact
              path="/search/:countryID/single/:postID"
              element={<Single />}
            />
            <Route
              exact
              path="/country/:countryID/single/:postID"
              element={<Single />}
            />
            <Route exact path="/recently/:postID" element={<Single />} />
            <Route exact path="/topliked/:postID" element={<Single />} />
            <Route exact path="/donate" element={<StripeContainer />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
