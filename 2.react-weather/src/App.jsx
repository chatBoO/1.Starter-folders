import loader from "./assets/loader.svg"; // Importation de l'icône de chargement
import { useState, useEffect } from "react"; // Importation des hooks React pour gérer l'état et les effets secondaires
import browser from "./assets/browser.svg"; // Importation d'une icône pour afficher en cas d'erreur
import "./App.css"; // Importation du fichier CSS pour le style de l'application

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY; // Récupération de la clé API depuis les variables d'environnement

function App() {
    // Déclaration des états locaux avec useState :
    const [weatherData, setWeatherData] = useState(null); // weatherData stocke les données météo récupérées
    const [errorInfo, setErrorInfo] = useState(null); // errorInfo stocke les informations d'erreur en cas de problème

    // Utilisation du hook useEffect pour effectuer une requête API après le premier rendu du composant
    useEffect(() => {
        fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`) // Requête à l'API pour récupérer les données météo de la ville la plus proche
            .then((response) => {
                // Vérification des erreurs HTTP (codes 400-499 pour les erreurs client, 500-599 pour les erreurs serveur)
                if (!response.ok)
                    throw new Error(
                        `Error ${response.status}, ${response.statusText}` // Si la réponse n'est pas OK, on lève une erreur avec le code et le message correspondant
                    );
                return response.json(); // Si la réponse est correcte, on convertit la réponse en JSON
            })
            .then((responseData) => {
                // Une fois les données récupérées, on met à jour l'état avec les informations pertinentes :
                setWeatherData({
                    city: responseData.data.city, // Nom de la ville
                    country: responseData.data.country, // Nom du pays
                    iconId: responseData.data.current.weather.ic, // Identifiant de l'icône météo (pour afficher une image correspondante)
                    temperature: responseData.data.current.weather.tp, // Température actuelle
                });
            })
            .catch((error) => {
                console.log(error); // En cas d'erreur, on logge l'erreur dans la console pour le débogage
                setErrorInfo(error.message); // On met à jour l'état errorInfo pour afficher un message d'erreur à l'utilisateur
            });
    }, []); // Le tableau vide [] signifie que cet effet ne sera exécuté qu'une seule fois après le premier rendu

    return (
        <main>
         {/* Affichage du loader si les données météo et les erreurs sont encore nulles- */}
            <div
                className={`loader-container ${
                    weatherData === null && errorInfo === null ? "active" : ""
                }`}
            >
                <img src={loader} alt="loading icon" />{" "}
                {/* Icône de chargement */}
            </div>

            {/* Affichage des données météo si elles sont disponibles */}
            {weatherData && (
                <>
                    <p className="city-name">
                        {weatherData.city || "Unknown City"}{" "}
                        {/* Nom de la ville ou "Unknown City" si non disponible */}
                    </p>
                    <p className="country-name">
                        {weatherData.country || "Unknown Country"}{" "}
                        {/* Nom du pays ou "Unknown Country" si non disponible */}
                    </p>
                    <p className="temperature">
                        {weatherData.temperature}&deg;{" "}
                        {/* Température actuelle avec le symbole degré */}
                    </p>
                    <div className="info-icon-container">
                        <img
                            src={`/icons/${weatherData.iconId}.svg`} // Affichage de l'icône météo correspondant à l'identifiant récupéré
                            className="info-icon"
                            alt="weather icon"
                        />
                    </div>
                </>
            )}

            {/* Affichage d'un message d'erreur et d'une icône si une erreur est survenue et qu'il n'y a pas de données météo */}
            {errorInfo && !weatherData && (
                <>
                    <p className="error-information">{errorInfo}</p>{" "}
                    {/* Message d'erreur */}
                    <img src={browser} alt="Erreur" /> {/* Icône d'erreur */}
                </>
            )}
        </main>
    );
}

export default App; // Exportation du composant App par défaut
