import React, { useState, useRef } from "react";
import "./app.scss";
import Player from "./components/player/Player";
import Library from "./components/Lib/Library";
import Songs from "./components/songs/Songs";
import Data from "./components/Data/Data";
import Nav from "./components/Nav/Nav";

function App() {
  const [songs, setSongs] = useState(Data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [playing, setPlaying] = useState(false);
  //state
  const [songInfo, setSongInfo] = useState({
    cTime: 0,
    duration: 0,
    animPer: 0,
  });
  const [libStatus, setlibStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calc perc
    const roundCurr = Math.round(current);
    const roundDur = Math.round(duration);
    const anim = Math.round((roundCurr / roundDur) * 100);

    setSongInfo({ ...songInfo, cTime: current, duration, animPer: anim });
  };

  //ref
  const audioRef = useRef(null);

  const songEndHandler = async () => {
    let indxSong = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(indxSong + 1) % songs.length]);
    if (playing) audioRef.current.play();
  };

  return (
    <div className={`App ${libStatus ? "lib-active" : ""}`}>
      <Nav libStatus={libStatus} setlibStatus={setlibStatus} />
      <Songs
        name={currentSong.name}
        cover={currentSong.cover}
        artist={currentSong.artist}
      />
      <Player
        playing={playing}
        setPlaying={setPlaying}
        song={currentSong.audio}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        setSongs={setSongs}
        songInfo={songInfo}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <Library
        playing={playing}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        libStatus={libStatus}
      />
      {/* LoadedMetadata load data initially ,onTimeupdate getinfo about time form audio file */}
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
