// Importation de la fonction createSlice depuis @reduxjs/toolkit.
// createSlice est une fonction utilitaire qui permet de créer facilement un slice (une partie de l'état Redux) avec des actions et un reducer.
import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial pour le slice "preview".
// Cet état contient une seule propriété : "preview", qui est initialisée à true, ce qui signifie que l'aperçu est visible par défaut.
const initialState = {
    preview: true,
};

// Création du slice "preview" avec createSlice.
// Ce slice gère l'état lié à l'aperçu (preview) dans l'application.
export const preview = createSlice({
    name: "preview",  // Nom du slice, utilisé pour identifier cette partie de l'état dans Redux.
    initialState,  // L'état initial du slice est défini par la constante initialState.
    
    // Les reducers définissent les actions possibles et la manière dont elles modifient l'état.
    reducers: {
        // Action togglePreview : inverse la valeur de "preview".
        // Si preview est true, elle devient false, et vice versa.
        togglePreview: (state) => {
            state.preview = !state.preview;
        },
        
        // Action hidePreview : force la valeur de "preview" à false, cachant ainsi l'aperçu.
        hidePreview: (state) => {
            state.preview = false;
        },
    },
});

// Exportation des actions générées automatiquement par createSlice.
// Ces actions peuvent être dispatchées dans les composants pour modifier l'état.
export const { togglePreview, hidePreview } = preview.actions;

// Exportation du reducer généré automatiquement par createSlice.
// Ce reducer sera utilisé pour configurer le store Redux et gérer l'état "preview".
export default preview.reducer;