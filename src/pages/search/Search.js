import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import apiClient from "../Spotify";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { AiFillPlayCircle } from "react-icons/ai";

import "../../index.css"


export default function Search() {
 
const[query,setQuery]=useState("");
const[search,setSearch]=useState([]);


  useEffect(() => {
    apiClient.get(`search?q=${query}&type=track`)
    .then((response) => {
       //console.log(response.data);
     setSearch(response.data.tracks.items);
    })
    .catch((err)=>
      console.log(err)
    )
  }, [query]);
 

  const navigate = useNavigate();

const playPlaylist = (id) => {
  navigate("/searchplayer", { state: { id: id } });
};


  return (
   <div className="screen-container">
   <div className="library-body">
    <div className="search">
     <input type='text' value={query}
     onChange={(e)=> setQuery(e.target.value)} 
     placeholder="What do you want to listen to?"
     />
         <FaSearch style={{fontSize:'20px', color:'white'}}/>
         </div> 

         {search?.map((item)=>(
           <div
             className="search-card"
             key={item.id}
             onClick={() => playPlaylist(item.id)}
             >
             <img
             src={item.album.images[0].url}
             className="search-image"
             alt="Playlist-Art"
           />
         
           <p className="search-title">{item.name}</p>
           <p className="search-artist">{item.album.artists[0].name}</p>
             
           <div className="search-fade">
           <IconContext.Provider value={{ size: "50px", color: "rgba(7, 204, 49, 0.985)" }}>
             <AiFillPlayCircle />
           </IconContext.Provider>
         </div>
         </div>
         ))}
      </div>
      </div>
   
  );
}

