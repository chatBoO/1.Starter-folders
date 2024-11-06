// Importation des icônes SVG pour afficher ou masquer la vue. Ces images seront utilisées dans le bouton.
import showView from "../assets/view.svg";
import hideView from "../assets/hide.svg";

// Importation des hooks useSelector et useDispatch depuis react-redux.
// useSelector permet d'accéder à l'état global de Redux, tandis que useDispatch permet d'envoyer des actions.
import { useSelector, useDispatch } from "react-redux";

// Importation de l'action togglePreview depuis le répertoire des fonctionnalités (features/preview).
// Cette action sera utilisée pour basculer l'état d'affichage de l'aperçu (preview).
import { togglePreview } from "../features/preview";

// Définition du composant PreviewButton, qui affiche un bouton permettant de montrer ou cacher un aperçu.
const PreviewButton = () => {
    
    // Utilisation de useSelector pour accéder à l'état 'preview' dans Redux.
    // Cet état contient probablement une propriété 'preview' qui indique si l'aperçu est actuellement visible ou non.
    const previewData = useSelector((state) => state.preview);

    // Initialisation de la fonction dispatch avec useDispatch, qui permet d'envoyer des actions à Redux.
    const dispatch = useDispatch();

    // Le composant retourne un élément <button> avec plusieurs propriétés :
    return (
        <button
            // Définition de la fonction onClick qui se déclenche lorsque le bouton est cliqué.
            // Elle envoie une action togglePreview au store Redux via dispatch pour basculer l'état d'affichage de l'aperçu.
            onClick={() => dispatch(togglePreview())}
            
            // Ajout de classes CSS pour styliser le bouton :
            // - py-2 px-4 : ajoute un padding interne vertical et horizontal.
            // - rounded : rend les coins du bouton arrondis.
            // - bg-blue-700 : définit une couleur de fond bleue foncée.
            // - flex : dispose les éléments enfants (l'image et le texte) en ligne.
            // - mx-auto : centre le bouton horizontalement dans son conteneur parent.
            // - items-center : centre verticalement les éléments enfants dans le bouton.
            // - text-slate-50 : définit la couleur du texte en gris clair (presque blanc).
            className="py-2 px-4 rounded bg-blue-700 flex mx-auto items-center text-slate-50"
        >
            {/* Affichage dynamique de l'image selon l'état 'preview'. */}
            {/* Si previewData.preview est vrai, on affiche hideView (icône pour cacher), sinon showView (icône pour afficher). */}
            <img
                className="w-5 mr-3"  // w-5 définit la largeur de l'image à 5 unités Tailwind, et mr-3 ajoute une marge à droite de 3 unités.
                src={previewData.preview ? hideView : showView}  // Choix dynamique de l'image en fonction de l'état 'preview'.
                alt=""  // L'attribut alt est vide ici, mais il pourrait être rempli pour améliorer l'accessibilité.
            />
            
            {/* Affichage dynamique du texte selon l'état 'preview'. */}
            {/* Si previewData.preview est vrai, on affiche "Hide Preview", sinon "Show Preview". */}
            <span>{previewData.preview ? "Hide" : "Show"} Preview</span>
        </button>
    );
};

// Exportation par défaut du composant PreviewButton afin qu'il puisse être utilisé ailleurs dans l'application.
export default PreviewButton;