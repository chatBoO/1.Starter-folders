// Importation de React pour créer des composants fonctionnels.
import React from "react";

// Importation de ReactDOM pour interagir avec le DOM et rendre les composants React.
import ReactDOM from "react-dom/client";

// Importation du composant principal App, qui constitue la structure de l'application.
import App from "./App.jsx";

// Importation du fichier CSS global pour appliquer des styles à l'application.
import "./index.css";

// Importation du store Redux, qui contient l'état global de l'application.
import { store } from "./store.js";

// Importation du composant Provider depuis react-redux.
// Provider permet de rendre le store Redux disponible à tous les composants de l'application.
import { Provider } from "react-redux";

// Utilisation de ReactDOM.createRoot pour créer une racine dans le DOM où l'application sera rendue.
// Cela utilise la nouvelle API de création de racine introduite dans React 18, qui permet une meilleure gestion du rendu.
ReactDOM.createRoot(document.getElementById("root")).render(
    // Le composant Provider enveloppe l'application entière (App).
    // Il permet à tous les composants enfants d'accéder au store Redux via le contexte.
    <Provider store={store}>
        <App />
    </Provider>
);