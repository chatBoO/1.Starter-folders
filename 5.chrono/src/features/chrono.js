// Importation de la fonction 'createSlice' de Redux Toolkit pour créer un slice Redux
import { createSlice } from "@reduxjs/toolkit";

// État initial du chronomètre
const initialState = {
    session: {
        value: 1500, // Durée de la session en secondes (25 minutes)
        runningValue: 1500, // Valeur actuelle du compte à rebours pour la session
    },
    pause: {
        value: 300, // Durée de la pause en secondes (5 minutes)
        runningValue: 300, // Valeur actuelle du compte à rebours pour la pause
    },
    isPlaying: false, // Indique si le chronomètre est en cours d'exécution
    intervalID: undefined, // Identifiant de l'intervalle pour le compte à rebours (setInterval)
    cycles: 0, // Nombre de cycles de travail/pause effectués
    displayedValue: {
        value: 1500, // Valeur affichée (initialement égale à la durée de la session)
        heading: "Work", // Titre affiché (par exemple "Work" ou "Pause")
    },
};

// Création du slice Redux pour le chronomètre avec des actions et des reducers
export const chrono = createSlice({
    name: "chrono",
    initialState,
    reducers: {
        // Action pour mettre à jour les valeurs du chronomètre (session ou pause)
        updateChronoValues: (state, action) => {
            const chosenState = state[action.payload.type]; // Sélectionne soit 'session' soit 'pause'

            // Empêche la valeur d'atteindre zéro
            if (chosenState.value + action.payload.value === 0) return;

            if (action.payload.type === "session") {
                if (!state.isPlaying) {
                    // Si le chrono n'est pas en cours, on met à jour les deux valeurs (value et runningValue)
                    chosenState.value = chosenState.value + action.payload.value;
                    chosenState.runningValue =
                        chosenState.runningValue + action.payload.value;
                    state.displayedValue.value = chosenState.runningValue; // Met à jour la valeur affichée
                } else {
                    // Si le chrono est en cours, seule la valeur est mise à jour
                    chosenState.value = chosenState.value + action.payload.value;
                }
            } else if (action.payload.type === "pause") {
                // Mise à jour des valeurs pour la pause
                chosenState.value = chosenState.value + action.payload.value;
            }
        },

        // Action exécutée chaque seconde pour décrémenter les valeurs du chronomètre
        tick: (state, action) => {
            if (state.session.runningValue > 0) {
                state.session.runningValue--; // Décrémente le temps restant dans la session
                state.displayedValue.value = state.session.runningValue; // Met à jour l'affichage
                state.displayedValue.heading = "Work"; // Affiche "Work" pendant la session
            } else if (state.pause.runningValue > 0) {
                state.pause.runningValue--; // Décrémente le temps restant dans la pause
                state.displayedValue.value = state.pause.runningValue; // Met à jour l'affichage
                state.displayedValue.heading = "Pause"; // Affiche "Pause" pendant la pause
            } else {
                state.cycles++; // Incrémente le nombre de cycles après une session et une pause complètes
                state.session.runningValue = state.session.value - 1; // Redémarre une nouvelle session avec une seconde en moins
                state.displayedValue.value = state.session.value - 1; 
                state.displayedValue.heading = "Work"; 
                state.pause.runningValue = state.pause.value; // Réinitialise la pause pour le prochain cycle
            }
        },

        // Action pour démarrer le chronomètre et stocker l'ID de l'intervalle dans l'état
        setUpChrono: (state, action) => {
            state.isPlaying = true; // Indique que le chrono est en cours d'exécution
            state.intervalID = action.payload; // Stocke l'ID de l'intervalle pour pouvoir l'arrêter plus tard
        },

        // Action pour réinitialiser le chronomètre à ses valeurs initiales
        resetChrono: (state, action) => {
            window.clearInterval(state.intervalID); // Arrête l'intervalle en utilisant son ID
            state.isPlaying = false; // Indique que le chrono n'est plus en cours d'exécution
            state.session.runningValue = state.session.value; // Réinitialise la session à sa valeur initiale
            state.pause.runningValue = state.pause.value; // Réinitialise la pause à sa valeur initiale
            state.displayedValue.value = state.session.runningValue; 
            state.cycles = 0; // Réinitialise le nombre de cycles à zéro
        },
    },
});

// Thunk asynchrone pour démarrer le chronomètre avec un intervalle qui déclenche 'tick' chaque seconde.
export const startChrono = (action) => {
    return function (dispatch, getState) {
        const intervalID = setInterval(() => {
            dispatch(tick()); // Appelle 'tick' toutes les secondes pour décrémenter les valeurs du chrono.
        }, 1000);

        dispatch(setUpChrono(intervalID)); // Enregistre l'ID de l'intervalle dans l'état.

        dispatch(tick()); // Exécute immédiatement un tick lors du démarrage.
    };
};

// Exportation des actions générées par createSlice et du reducer par défaut.
export const { updateChronoValues, setUpChrono, resetChrono, tick } =
    chrono.actions;
export default chrono.reducer;