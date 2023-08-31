import React, { useState,useEffect } from 'react';

import '../index.css'
import apiClient from './Spotify';

const Trending = () => {

  const [newRelease, setNewRelease] = useState([]);


  useEffect(()=> {
  apiClient
  .get("/browse/new-releases")
  .then((res) => {
    const a = res.data?.albums.items;

     setNewRelease(a);
  })
  .catch((err) => console.error(err));
}
, []);


  return (
    <div className='screen-container1'>
    <div className="library-body">
        {newRelease?.map((item)=>(
           <div
             className="search-card"
             key={item.id}
        
             >
             <img
           src={item.images[0].url}
             className="search-image"
             alt="Playlist-Art"
           />
         
           <p className="search-title">{item.name}</p>
           <p className="search-artist">{item.artists[0].name}</p>  
             
           <div className="search-fade">
      
         </div>
         </div>
         ))}

    </div>
    </div>
  )
}

export default Trending
