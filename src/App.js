import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./pages/Player";

import { setClientToken } from "./pages/Spotify.js";

import Favorites from "./pages/Favorites";
import Search from "./pages/search/Search";
import Playlists from "./pages/Playlists";
import Trending from "./pages/Trending";
import Sidebar from "./pages/Sidebar/sidebar";
import SearchPlayer from "./pages/search/SearchPlayer";

export default function App() {
 
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    
    } else {
      setToken(token);
      setClientToken(token);

    }
 
  }, []);

  return(
    <>
    {
      !token ? (
    <Login />
  ) : (

    <Router>
      
    <div className="main-body">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Playlists />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/player" element={<Player />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/searchplayer" element={<SearchPlayer />} />
      </Routes>
    </div>
  </Router>
  
  )
}
    </>
  );

}
