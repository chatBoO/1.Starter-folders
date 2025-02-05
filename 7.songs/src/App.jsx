// App.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import PlayerPannel from "./layout/Player/PlayerPannel";
import { getMusicsData } from "./features/playlistSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMusicsData());
    }, [dispatch]);

    return (
        <>
            <div className="min-h-screen bg-slate-800 pt-20 px-4">
                <div className="max-w-xl mx-auto">
                    <Player />
                    <h1 className="text-slate-100 text-2xl">
                        PlayerMania - Your songs :
                    </h1>
                    <Playlist />
                </div>
            </div>
            <PlayerPannel />
        </>
    );
}

export default App;