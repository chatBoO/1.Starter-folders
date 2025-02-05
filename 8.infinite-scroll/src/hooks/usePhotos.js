import { useState, useEffect } from "react"; // Importation des hooks React nécessaires.

// Déclaration du hook personnalisé `usePhotos` qui prend deux paramètres :
// `querySearch` (terme de recherche) et `pageIndex` (numéro de page pour la pagination).
const usePhotos = (querySearch, pageIndex) => {
    // État pour gérer les erreurs, initialisé avec un message vide et un état d'erreur à `false`.
    const [error, setError] = useState({
        msg: "",
        state: false,
    });

    // État pour stocker les photos récupérées depuis l'API.
    const [photos, setPhotos] = useState([]);

    // État pour suivre le nombre maximum de pages disponibles dans les résultats de recherche.
    const [maxPages, setMaxPages] = useState(0);

    // État pour indiquer si les données sont en cours de chargement.
    const [loading, setLoading] = useState(true);

    // Effet déclenché lorsque la valeur de `querySearch` change.
    // Réinitialise les photos et le nombre maximum de pages si ces états ne sont pas vides.
    useEffect(() => {
        if (photos.length !== 0 && maxPages !== 0) {
            setPhotos([]); // Réinitialisation du tableau des photos.
            setMaxPages(0); // Réinitialisation du nombre maximum de pages.
        }
    }, [querySearch]); // Dépendance sur `querySearch`.

    // Effet déclenché lorsque `querySearch` ou `pageIndex` change.
    useEffect(() => {
        setLoading(true); // Indique que le chargement commence.

        // Requête à l'API Unsplash pour récupérer des photos en fonction des paramètres donnés.
        fetch(
            `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${
                import.meta.env.VITE_UNSPLASH_KEY
            }`
        )
            .then((response) => {
                if (!response.ok)
                    // Si la réponse n'est pas correcte, on lève une erreur avec un message descriptif.
                    throw new Error(
                        `${response.status} Error, something went wrong`
                    );
                return response.json(); // Conversion de la réponse en JSON.
            })
            .then((data) => {
                // Mise à jour des photos avec les résultats obtenus en ajoutant aux photos existantes.
                setPhotos((state) => [...state, ...data.results]);

                // Mise à jour du nombre maximum de pages disponibles dans les données reçues.
                setMaxPages(data.total_pages);

                setLoading(false); // Indique que le chargement est terminé.
            })
            .catch((err) => {
                // Gestion des erreurs : mise à jour de l'état d'erreur avec un message et un état actif.
                setError({
                    msg: err.message,
                    state: true,
                });

                setLoading(false); // Indique que le chargement est terminé même en cas d'erreur.
            });
    }, [querySearch, pageIndex]); // Dépendances sur `querySearch` et `pageIndex`.

    // Retourne les états nécessaires pour être utilisés dans le composant appelant ce hook.
    return { error, photos, maxPages, loading };
};

export default usePhotos; // Exportation du hook personnalisé pour utilisation ailleurs dans l'application.
