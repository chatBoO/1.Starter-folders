// Player.jsx
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Player = () => {
    const playlist = useSelector((state) => state.playlist);
    const audioRef = useRef();

    const currentSong = playlist.songs?.find(
        (obj) => obj.id === playlist.currentMusicID
    );

    return (
        <audio
            id="audio-player"
            src={currentSong ? currentSong.url : ""}
            ref={audioRef}
        ></audio>
    );
};

export default Player;