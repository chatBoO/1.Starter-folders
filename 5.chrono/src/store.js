// Importation de la fonction configureStore depuis @reduxjs/toolkit.
// configureStore simplifie la configuration du store Redux en appliquant des bonnes pratiques par défaut.
import { configureStore } from "@reduxjs/toolkit";

// Importation des reducers pour les fonctionnalités "chrono".
// Ces reducers sont créés avec createSlice dans leurs fichiers respectifs.
import chrono from "./features/chrono";

// Configuration du store Redux avec configureStore.
// Le store combine les reducers "tabs" et "preview".
export const store = configureStore({
    reducer: {
        chrono  // Le reducer pour gérer l'état de l'aperçu (preview).
    },
});