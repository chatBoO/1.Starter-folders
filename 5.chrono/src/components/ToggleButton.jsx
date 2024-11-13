// Importation des images SVG pour les boutons "play" et "reset"
import play from "../assets/play-button.svg";
import reset from "../assets/reset.svg";

// Importation des hooks 'useSelector' et 'useDispatch' de React-Redux
import { useSelector, useDispatch } from "react-redux";

// Importation des actions Redux pour démarrer et réinitialiser le chronomètre
import { startChrono, resetChrono } from "../features/chrono";

// Composant fonctionnel ToggleButton
const ToggleButton = () => {
    // Utilisation du hook 'useDispatch' pour obtenir la fonction dispatch de Redux
    const dispatch = useDispatch();

    // Utilisation du hook 'useSelector' pour accéder à l'état du chronomètre dans le store Redux
    const chronoValues = useSelector((state) => state.chrono);

    // Fonction qui bascule entre démarrer et réinitialiser le chronomètre
    const toggleChrono = () => {
        if (!chronoValues.isPlaying) {
            // Si le chronomètre n'est pas en cours, on déclenche l'action 'startChrono'
            dispatch(startChrono());
        } else {
            // Sinon, on déclenche l'action 'resetChrono' pour réinitialiser le chronomètre
            dispatch(resetChrono());
        }
    };

    return (
        // Bouton avec un gestionnaire d'événements 'onClick' qui appelle la fonction 'toggleChrono'
        <button
            onClick={toggleChrono}
            className="px-4 py-2 text-slate-800 flex justify-center items-center mx-auto bg-slate-300 rounded hover:bg-slate-200"
        >
            {/* Texte du bouton qui change en fonction de l'état du chronomètre (démarrer ou réinitialiser) */}
            <span className="mr-3 text-lg">
                {chronoValues.isPlaying ? "Reset" : "Start"}
            </span>

            {/* Image du bouton qui change en fonction de l'état (play ou reset) */}
            <img
                className="w-5"
                src={chronoValues.isPlaying ? reset : play}
                alt=""
            />
        </button>
    );
};

// Exportation du composant ToggleButton pour pouvoir l'utiliser ailleurs dans l'application
export default ToggleButton;
