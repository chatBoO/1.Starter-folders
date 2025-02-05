import { useState, useEffect, useRef } from "react"; // Importation des hooks React nécessaires.
import spinner from "../assets/spinner.svg"; // Importation d'une image de chargement (spinner).
import usePhotos from "../hooks/usePhotos"; // Importation du hook personnalisé pour récupérer les photos.

const List = () => {
    // État pour stocker la requête de recherche. Initialisé avec "random".
    const [query, setQuerry] = useState("random");

    // État pour suivre le numéro de page actuel (pour la pagination). Initialisé à 1.
    const [pageNumber, setPageNumber] = useState(1);

    // Référence pour suivre le dernier élément visible dans la liste des photos (utilisé pour le chargement infini).
    const lastPicRef = useRef();

    // Référence pour accéder à l'input de recherche.
    const searchRef = useRef();

    // Appel du hook personnalisé `usePhotos` avec les paramètres `query` et `pageNumber`.
    const photosApiData = usePhotos(query, pageNumber);

    // Effet déclenché lorsque `lastPicRef` ou les données de l'API changent.
    useEffect(() => {
        if (lastPicRef.current) {
            // Création d'un observateur d'intersection pour détecter si le dernier élément est visible dans le viewport.
            const observer = new IntersectionObserver(([entry]) => {
                if (
                    entry.isIntersecting && // Vérifie si l'élément est visible.
                    photosApiData.maxPages !== pageNumber // Vérifie qu'on n'a pas atteint la dernière page.
                ) {
                    setPageNumber(pageNumber + 1); // Incrémente le numéro de page pour charger plus de résultats.
                    lastPicRef.current = null; // Réinitialise la référence pour éviter des appels multiples.
                    observer.disconnect(); // Déconnecte l'observateur pour éviter des exécutions inutiles.
                }
            });

            observer.observe(lastPicRef.current); // Lie l'observateur au dernier élément visible.
        }
    }, [photosApiData]); // Dépendances : déclenchement lorsque `photosApiData` change.

    // Gestionnaire de soumission du formulaire de recherche.
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission.

        if (searchRef.current.value !== query) {
            setQuerry(searchRef.current.value); // Met à jour la requête avec la valeur saisie par l'utilisateur.
            setPageNumber(1); // Réinitialise le numéro de page à 1 pour une nouvelle recherche.
        }
    };

    return (
        <>
            {/* Titre principal */}
            <h1 className="text-4xl">Unsplash Clone</h1>

            {/* Formulaire de recherche */}
            <form onSubmit={handleSubmit}>
                <label className="block mb-4" htmlFor="search">
                    Look for images...
                </label>
                <input
                    className="block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-grey-500 rounded border border-slate-400"
                    type="text"
                    placeholder="Look for something..."
                    ref={searchRef} // Référence utilisée pour accéder à la valeur saisie par l'utilisateur.
                />
            </form>

            {/* Affichage d'un message d'erreur si une erreur survient */}
            {photosApiData.error.state && <p>{photosApiData.error.msg}</p>}

            {/* Affichage d'un message si aucune image n'est trouvée */}
            {photosApiData.photos.length === 0 &&
                !photosApiData.error.state &&
                !photosApiData.loading && (
                    <p>No image available for this query</p>
                )}

            {/* Liste des photos */}
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-row-[175px] gap-4 justify-center">
                {!photosApiData.loader && // Affiche les photos uniquement si elles sont chargées et disponibles.
                    photosApiData.photos.length !== 0 &&
                    photosApiData.photos.map((photo, index) => {
                        if (photosApiData.photos.length === index + 1) {
                            // Si c'est la dernière photo, on attache `lastPicRef` pour le chargement infini.
                            return (
                                <li ref={lastPicRef} key={photo.id}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={photo.urls.regular} // URL de l'image.
                                        alt={photo.alt_description} // Description alternative pour l'image.
                                    />
                                </li>
                            );
                        } else {
                            return (
                                <li key={photo.id}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={photo.urls.regular}
                                        alt={photo.alt_description}
                                    />
                                </li>
                            );
                        }
                    })}
            </ul>

            {/* Affichage du spinner pendant le chargement */}
            {photosApiData.loading && !photosApiData.error.state && (
                <img className="block mx-auto" src={spinner} />
            )}

            {/* Message affiché lorsqu'il n'y a plus d'images à charger */}
            {photosApiData.maxPages === pageNumber && (
                <p className="mt-10">No more images to show for this query.</p>
            )}
        </>
    );
};

export default List; // Exportation du composant pour utilisation dans d'autres parties de l'application.
