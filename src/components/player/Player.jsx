import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  songs,
  playing,
  setPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  setSongs,
}) => {
  const activeLibHandler = (nxtpre) => {
    const newSongs = songs.map((song) => {
      if (song.id === nxtpre.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  //pause play
  const playHandler = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(!playing);
    } else {
      audioRef.current.play();
      setPlaying(!playing);
    }
  };

  const skipHandler = async (direction) => {
    let indxSong = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-for") {
      await setCurrentSong(songs[(indxSong + 1) % songs.length]);
      activeLibHandler(songs[(indxSong + 1) % songs.length]);
    }

    if (direction === "skip-pre") {
      if ((indxSong - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibHandler(songs[songs.length - 1]);
        if (playing) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(indxSong - 1) % songs.length]);
      activeLibHandler(songs[(indxSong - 1) % songs.length]);
    }
    if (playing) audioRef.current.play();
  };
  const trackAnim = {
    transform: `translateX(${songInfo.animPer}%)`,
  };

  //time conversion
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //drag
  const dragHandler = (e) => {
    //passing current time to audio tag
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, cTime: e.target.value });
  };

  //addthe styles

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.cTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            value={songInfo.cTime}
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>{" "}
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-pre")}
          className="play"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playHandler}
          size="2x"
          icon={playing ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="play"
          onClick={() => skipHandler("skip-for")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
