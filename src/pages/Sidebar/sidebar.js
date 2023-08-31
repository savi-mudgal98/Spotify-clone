import React, { useState, useEffect} from "react";
import SidebarButton from "./sidebar-button";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";

import { IoLibrary } from "react-icons/io5";
import {BsFillSearchHeartFill} from "react-icons/bs"
import apiClient from "../Spotify";
import { useNavigate } from 'react-router-dom';
import "../../index.css"

export default function Sidebar() {
  const [info, setInfo] = useState(
    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
  );

  const navigate= useNavigate();

  const singingOut=()=>{
    console.log("called");
    localStorage.removeItem('token');
     navigate("/");
  }
  

  useEffect(() => {
    apiClient.get("me").then((response) => {
    console.log(response.data);
     setInfo(response.data);
    })
    .catch((err)=>
    console.log(err)
  )

  }, []);


  return (
    <div className="sidebar-container">
      
        
      <p style={{color:'white'}} >{info.display_name}</p>
      <img src={info.images[0].url} className="profile-img" alt="profile" />

      <div>
        <SidebarButton title="Search" to="/search" icon={<BsFillSearchHeartFill/>} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Playlists" to="/" icon={<IoLibrary />} />
        <SidebarButton title="Favorites"  to="/favorites" icon={<MdFavorite />}/>
      </div>
      
       <button variant="text"  onClick={singingOut} className="signout">
         Sign Out
       </button>
    </div>
  );
}