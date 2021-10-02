import React from "react";
import Libsongs from "../lib_songs/Libsongs";

const Library = ({
  songs,
  setCurrentSong,
  playing,
  audioRef,
  libStatus,
  setSongs,
}) => {
  return (
    <div className={`library ${libStatus ? "active-lib" : ""}`}>
      <h2>Songs</h2>
      <div className="lib-songs">
        {/* {console.log(songs)} */}
        {songs.map((song) => (
          <Libsongs
            songs={songs}
            playing={playing}
            key={song.id}
            song={song}
            id={song.id}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
