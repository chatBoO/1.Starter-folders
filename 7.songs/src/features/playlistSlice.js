import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: undefined,
    play: false,
    currentMusicID: undefined,
};

export const playlist = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addBaseSongs: (state, action) => {
            state.songs = action.payload;
            state.currentMusicID = action.payload[2].id;
        },
    },
});

export const getMusicsData = () => {
    return (dispatch) => {
        fetch("./data/playlist.json")
            .then((data) => data.json())
            .then((data) => dispatch(addBaseSongs(data.playlist)));
    };
};

export const { addBaseSongs } = playlist.actions;
export default playlist.reducer;
