// Importation de la fonction configureStore depuis @reduxjs/toolkit.
// configureStore simplifie la configuration du store Redux en appliquant des bonnes pratiques par défaut.
import { configureStore } from "@reduxjs/toolkit";

// Importation des reducers pour les fonctionnalités "tabs" et "preview".
// Ces reducers sont créés avec createSlice dans leurs fichiers respectifs.
import tabs from "./features/tabs";
import preview from "./features/preview";

// Configuration du store Redux avec configureStore.
// Le store combine les reducers "tabs" et "preview".
export const store = configureStore({
    reducer: {
        tabs,      // Le reducer pour gérer l'état des onglets (tabs).
        preview,   // Le reducer pour gérer l'état de l'aperçu (preview).
    },
});