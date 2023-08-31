import React, { useState,useEffect } from 'react';
import '../index.css'
import apiClient from './Spotify';
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';



const Favorites = () => {

  const[favorites, setFavorites]=useState();
  
  useEffect(()=> {
    apiClient
    .get("me/tracks")
    .then((res) => {
      const a = res.data.items;
    // console.log(a);
       setFavorites(a);
    })
    .catch((err) => console.error(err));
  }
  , []);


  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/searchplayer", { state: { id: id } });
  };
  
  
  return (
  
<div className='screen-container1'>
      <div className="library-body">
        {favorites?.map((fav)=>(
           <div
             className="search-card"
             key={fav.id}
            onClick={() => playPlaylist(fav.id)}
             >
             <img
            src={fav.track.album.images[0].url}
             className="search-image"
             alt="Playlist-Art"
           />
         
           <p className="search-title">{fav.track.name}</p>
            <p className="search-artist">{fav.track.artists[0].name}</p> 
             
           <div className="search-fade">
           <IconContext.Provider value={{ size: "50px", color: "rgba(7, 204, 49, 0.985)" }}>
             <AiFillPlayCircle />
           </IconContext.Provider>
         </div>
         </div>
        ))}
        </div>
    </div>
  )
}

export default Favorites
