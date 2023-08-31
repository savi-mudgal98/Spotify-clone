import React from "react";
import { useLocation } from "react-router-dom";
import Controls from "../../components/AudioPlayer/controls";
import ProgressCircle from "../../components/AudioPlayer/progressCircle";
import { useState, useEffect, useRef } from "react";
import apiClient from "../Spotify";
import WaveAnimation from "../../components/AudioPlayer/waveanimation";
import "../../index.css";


const SearchPlayer = () => {
  const location = useLocation();
 const [track,setTrack]= useState();
 const [trackProgress, setTrackProgress] = useState(0);

  
 const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {

      if (location.state) {
      apiClient.get("tracks/"+ location.state?.id)
      .then((res)=>{
        // console.log(res);  
      setTrack(res.data);
      })}},[location.state]);


    //   for playing the songs
      
    var audioSrc = track?.preview_url;

    const audioRef = useRef(new Audio(track?.preview_url));

    const intervalRef = useRef();

    const { duration } = audioRef.current;

    const currentPercentage = duration ? ((trackProgress / duration) * 100) : 0;

    const startTimer = () => {
      clearInterval(intervalRef.current);
  
      intervalRef.current = setInterval(() => {
       
    
          setTrackProgress(audioRef.current.currentTime);
        
      }, [1000]);
    };

    useEffect(() => {
      if (audioRef.current.src) {
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      } else {
        if (isPlaying) {
          audioRef.current = new Audio(audioSrc);
          audioRef.current.play();
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }
    }, [isPlaying]);


    useEffect(() => {
      return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      };
    }, []);


    const addZero = (n) => {
      return n > 9 ? "" + n : '0' + n;
    };
    const artists = [];
    track?.album?.artists.forEach((artist) => {
      artists.push(artist.name);
    });


  return (
    <div className="screen-container1">
    

      <ProgressCircle
           percentage={currentPercentage}
          isPlaying={true}
          image={track?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
   <div className="player-right-body flex">
        <p className="song-title">{track?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          
          
      <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
           
          />

          </div></div>
    </div>
  )
}

export default SearchPlayer;
