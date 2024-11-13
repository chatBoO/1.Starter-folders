// Importation des composants ToggleButton et UpdateTimeButton
import ToggleButton from "./components/ToggleButton";
import UpdateTimeButton from "./components/UpdateTimeButton";

// Importation du hook 'useSelector' de React-Redux pour accéder à l'état global
import { useSelector } from "react-redux";

// Importation de la fonction utilitaire pour formater les valeurs du chronomètre
import getFormattedValue from "./utils/getFormattedValue";

// Composant principal de l'application Pomodoro
function App() {
    // Utilisation du hook 'useSelector' pour accéder aux valeurs du chronomètre dans le store Redux
    const chronoValues = useSelector((state) => state.chrono);

    return (
        // Conteneur principal avec des classes Tailwind CSS pour le style
        <div className="bg-slate-700 text-slate-100 pt-20 min-h-screen">
            <div className="max-w-xl mx-auto border border-slate-500 rounded p-10">
                {/* Titre de l'application */}
                <h1 className="text-center text-3xl mb-8">Pomodoro App</h1>

                {/* Bloc contenant les boutons pour ajuster les durées des sessions et des pauses */}
                <div className="flex justify-center mb-8">
                    {/* Bloc de la session */}
                    <div className="flex flex-col items-center mr-10">
                        <p className="text-center mb-1">Sessions</p>
                        <div className="flex">
                            {/* Bouton pour décrémenter la durée de la session */}
                            <UpdateTimeButton sign={"-"} type={"session"} />
                            {/* Affichage de la durée actuelle de la session (en minutes) */}
                            <p className="mx-4 text-xl">
                                {chronoValues.session.value / 60}
                            </p>
                            {/* Bouton pour incrémenter la durée de la session */}
                            <UpdateTimeButton sign={"+"} type={"session"} />
                        </div>
                    </div>

                    {/* Bloc de la pause */}
                    <div className="flex flex-col items-center">
                        <p className="text-center mb-1">Pauses</p>
                        <div className="flex">
                            {/* Bouton pour décrémenter la durée de la pause */}
                            <UpdateTimeButton sign={"-"} type={"pause"} />
                            {/* Affichage de la durée actuelle de la pause (en minutes) */}
                            <p className="mx-4 text-xl">
                                {chronoValues.pause.value / 60}
                            </p>
                            {/* Bouton pour incrémenter la durée de la pause */}
                            <UpdateTimeButton sign={"+"} type={"pause"} />
                        </div>
                    </div>
                </div>

                {/* Affichage du titre indiquant si c'est une session ou une pause en cours */}
                <p className="text-center mb-2 text-xl font-semibold">
                    {chronoValues.displayedValue.heading}
                </p>

                {/* Affichage du temps restant formaté (minutes et secondes) */}
                <p className="text-center flex justify-center mb-1">
                    <span className="text-4xl p-4 rounded bg-slate-300 text-slate-900">
                        {getFormattedValue(chronoValues.displayedValue.value)}
                    </span>
                </p>

                {/* Affichage du nombre de cycles passés */}
                <p className="mb-10 text-center">
                    Passed cycle(s) : {chronoValues.cycles}
                </p>

                {/* Bouton pour démarrer ou réinitialiser le chronomètre */}
                <ToggleButton />
            </div>
        </div>
    );
}

// Exportation du composant App pour pouvoir l'utiliser dans l'application React
export default App;
