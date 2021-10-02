import React from "react";

const Libsongs = ({
  song,
  setCurrentSong,
  playing,
  audioRef,
  songs,
  setSongs,
  id,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (playing) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`lib-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.cover} />
      <div className="song-desc">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default Libsongs;
