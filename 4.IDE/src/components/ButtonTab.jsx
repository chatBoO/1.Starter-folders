// Importation de la fonction useDispatch depuis react-redux, qui permet d'accéder à la fonction de dispatch
// pour envoyer des actions à l'état global géré par Redux.
import { useDispatch } from "react-redux";

// Importation de l'action hidePreview depuis le répertoire des fonctionnalités (features/preview).
// Cette action sera déclenchée pour cacher l'aperçu (preview) lorsqu'un bouton est cliqué.
import { hidePreview } from "../features/preview";

// Définition du composant ButtonTab qui prend quatre props :
// - id : l'identifiant du bouton ou de l'onglet (tab).
// - toggleTab : une fonction qui change l'onglet actif.
// - buttonContent : le texte à afficher sur le bouton.
// - imgURL : l'URL de l'image à afficher dans le bouton.
const ButtonTab = ({ id, toggleTab, buttonContent, imgURL }) => {
    
    // Initialisation de la fonction dispatch avec useDispatch, qui permet d'envoyer des actions à Redux.
    const dispatch = useDispatch();

    // Le composant retourne un élément <button> avec plusieurs propriétés :
    return (
        <button
            // Définition de la fonction onClick qui se déclenche lorsque le bouton est cliqué.
            // Elle fait deux choses :
            // 1. Appelle la fonction toggleTab en passant l'id du bouton pour changer l'onglet actif.
            // 2. Envoie une action hidePreview au store Redux via dispatch pour cacher l'aperçu.
            onClick={() => {
                toggleTab(id);
                dispatch(hidePreview());
            }}
            
            // Ajout de classes CSS pour styliser le bouton :
            // - flex : pour disposer les éléments enfants (l'image et le texte) en ligne.
            // - items-center : pour centrer verticalement les éléments enfants dans le bouton.
            // - px-5 py-3 : pour ajouter un padding horizontal et vertical.
            // - hover:bg-slate-600 : change la couleur de fond en gris ardoise lorsque la souris passe sur le bouton.
            // - focus:bg-slate-600 : change la couleur de fond en gris ardoise lorsque le bouton est focalisé (par exemple via tabulation).
            // - outline-none : supprime les bordures par défaut lors du focus sur le bouton.
            className="flex items-center px-5 py-3 hover:bg-slate-600 focus:bg-slate-600 outline-none"
        >
            {/* Affichage d'une image dans le bouton. */}
            {/* L'attribut src prend imgURL (l'URL de l'image passée en prop). */}
            {/* La classe w-5 définit une largeur fixe de 5 unités Tailwind pour l'image. */}
            {/* L'attribut alt est vide ici, mais il pourrait être rempli pour améliorer l'accessibilité. */}
            <img src={imgURL} className="w-5" alt="" />
            
            {/* Affichage du texte du bouton. */}
            {/* ml-3 ajoute une marge à gauche de 3 unités entre l'image et le texte. */}
            {/* text-slate-100 définit la couleur du texte en gris clair. */}
            {/* text-md définit la taille du texte comme moyenne. */}
            <span className="ml-3 text-slate-100 text-md">{buttonContent}</span>
        </button>
    );
};

// Exportation par défaut du composant ButtonTab afin qu'il puisse être utilisé ailleurs dans l'application.
export default ButtonTab;