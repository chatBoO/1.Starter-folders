// PlayerPannel.jsx
import React from "react";
import { useSelector } from "react-redux";

const PlayerPannel = () => {
    const playlist = useSelector((state) => state.playlist);
    const actualSong = playlist.songs?.find(
        (obj) => obj.id === playlist.currentMusicID
    );

    return (
        <div className="fixed w-full bottom-0 rounded border-t-2 border-gray-800 p-6 bg-gradient-to-r from-indigo-100 to-purple-200">
            <div className="max-w-[800px] mx-auto mb-2">
                <p className="text-xl text-slate-800 font-semibold">
                    {actualSong ? actualSong.title : "No song playing"}
                </p>
                <div className="flex justify-between">
                    <p className="text-lg text-gray-900">
                        {" "}
                        {actualSong && actualSong.artist}
                    </p>
                    <p className="text-lg text-gray-900">
                        {" "}
                        {playlist.songs?.findIndex(song => song.id === playlist.currentMusicID) + 1} / {playlist.songs?.length}
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center mb-5">
                
            </div>

        </div>
    );
};

export default PlayerPannel;
