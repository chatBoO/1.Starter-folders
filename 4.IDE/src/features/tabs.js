// Importation de la fonction createSlice depuis @reduxjs/toolkit.
// createSlice est une fonction utilitaire qui permet de créer facilement un slice (une partie de l'état Redux) avec des actions et un reducer.
import { createSlice } from "@reduxjs/toolkit";

// Importation des images ou icônes associées aux langages HTML, CSS et JavaScript.
import { html, css, js } from "../assets/index";

// Définition de l'état initial sous forme de tableau d'objets.
// Chaque objet représente un onglet avec les propriétés suivantes :
// - id : identifiant unique de l'onglet.
// - lang : langage associé à l'onglet (html, css, javascript).
// - imgURL : URL de l'image (icône) associée au langage.
// - buttonContent : texte à afficher sur le bouton de l'onglet.
// - code : contenu initial du code pour cet onglet.
const initialState = [
    {
        id: 1,
        lang: "html",
        imgURL: html,
        buttonContent: "HTML",
        code: `<div>
        <h1>Éditeur de code avec REACT</h1>
        <p>Codez directement sur votre navigateur.</p>
        </div>
        `,
    },
    {
        id: 2,
        lang: "css",
        imgURL: css,
        buttonContent: "CSS",
        code: `body {
            font-family: Roboto, sans-serif;
            padding: 25px;
            color: #111;
            background-color: #f1f1f1
        }`,
    },
    {
        id: 3,
        lang: "javascript",
        imgURL: js,
        buttonContent: "JavaScript",
        code: `console.log("Hello World")`,
    },
];

// Création du slice "codeUpdater" avec createSlice.
// Ce slice gère l'état des différents onglets de code dans l'application.
export const codeUpdater = createSlice({
    name: "code-updater",  // Nom du slice, utilisé pour identifier cette partie de l'état dans Redux.
    initialState,  // L'état initial du slice est défini par la constante initialState.

    // Les reducers définissent les actions possibles et la manière dont elles modifient l'état.
    reducers: {
        // Action updateCode : permet de mettre à jour le contenu du code d'un onglet spécifique.
        // L'action reçoit un payload contenant l'id de l'onglet et la nouvelle valeur du code.
        updateCode: (state, action) => {
            // Recherche dans le tableau d'onglets celui qui correspond à l'id fourni dans action.payload.id.
            const tab = state.find((obj) => obj.id === action.payload.id);
            
            // Si un onglet correspondant est trouvé, on met à jour son contenu avec la nouvelle valeur (action.payload.value).
            if (tab) {
                tab.code = action.payload.value;
            }
        },
    },
});

// Exportation de l'action générée automatiquement par createSlice.
// Cette action peut être dispatchée dans les composants pour modifier le contenu d'un onglet spécifique.
export const { updateCode } = codeUpdater.actions;

// Exportation du reducer généré automatiquement par createSlice.
// Ce reducer sera utilisé pour configurer le store Redux et gérer l'état des onglets de code.
export default codeUpdater.reducer;