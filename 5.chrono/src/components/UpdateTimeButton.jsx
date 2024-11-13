// Importation du hook 'useDispatch' de React-Redux pour envoyer des actions au store Redux
import { useDispatch } from "react-redux";

// Importation de l'action 'updateChronoValues' depuis le slice 'chrono'
import { updateChronoValues } from "../features/chrono";

// Composant fonctionnel UpdateTimeButton qui prend deux props : 'sign' et 'type'
const UpdateTimeButton = ({ sign, type }) => {
    // Utilisation du hook 'useDispatch' pour obtenir la fonction dispatch de Redux
    const dispatch = useDispatch();

    // Fonction qui gère la mise à jour des valeurs du chronomètre
    const handleUpdate = () => {
        // Envoie une action à Redux pour mettre à jour les valeurs du chronomètre
        // La valeur envoyée dépend du signe ('+' ou '-') : 60 secondes pour '+' et -60 secondes pour '-'
        dispatch(updateChronoValues({ type, value: sign === "+" ? 60 : -60 }));
    };

    return (
        // Bouton qui déclenche la mise à jour des valeurs du chronomètre lors d'un clic
        <button
            onClick={handleUpdate}
            className="w-8 h-8 text-4xl text-slate-700 bg-slate-200 rounded flex justify-center items-center"
        >
            {/* Affichage du signe ('+' ou '-') dans le bouton */}
            <span className="relative bottom-1 pointer-events-none">
                {sign}
            </span>
        </button>
    );
};

// Exportation du composant UpdateTimeButton pour pouvoir l'utiliser ailleurs dans l'application
export default UpdateTimeButton;