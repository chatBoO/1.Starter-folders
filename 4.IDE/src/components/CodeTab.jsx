// Importation de la fonction useDispatch depuis react-redux, qui permet d'accéder à la fonction de dispatch
// pour envoyer des actions à l'état global géré par Redux.
import { useDispatch } from "react-redux";

// Importation de l'action updateCode depuis le répertoire des fonctionnalités (features/tabs).
// Cette action sera utilisée pour mettre à jour le code dans l'état global.
import { updateCode } from "../features/tabs";

// Définition du composant CodeTab qui prend deux props :
// - code : le contenu du code qui sera affiché dans la zone de texte.
// - id : l'identifiant unique de l'onglet ou du bloc de code associé.
const CodeTab = ({ code, id }) => {
    
    // Initialisation de la fonction dispatch avec useDispatch, qui permet d'envoyer des actions à Redux.
    const dispatch = useDispatch();

    // Le composant retourne un élément <textarea> avec plusieurs propriétés :
    return (
        <textarea
            // Définition de la fonction onChange, qui se déclenche lorsque le contenu de la zone de texte change.
            // Elle envoie une action updateCode au store Redux via dispatch.
            // L'action contient un objet avec l'id et la nouvelle valeur (e.target.value) du texte modifié.
            onChange={(e) =>
                dispatch(updateCode({ id, value: e.target.value }))
            }

            // La propriété value est liée à la prop 'code', ce qui signifie que le contenu de la zone de texte
            // sera toujours synchronisé avec la valeur actuelle du code passé en prop.
            value={code}

            // Désactivation de la vérification orthographique dans la zone de texte, car il s'agit probablement
            // d'un éditeur de code où les vérifications orthographiques ne sont pas nécessaires.
            spellCheck="false"

            // Ajout de classes CSS pour styliser la zone de texte :
            // - bg-zinc-900 : définit une couleur de fond sombre (gris foncé).
            // - text-slate-200 : définit une couleur claire pour le texte (gris clair).
            // - text-xl : définit une taille de texte relativement grande (taille extra-large).
            // - p-8 : ajoute un padding interne de 8 unités Tailwind autour du contenu.
            // - block : fait en sorte que l'élément occupe toute la largeur disponible (comportement en bloc).
            // - h-full et w-full : assurent que la zone de texte occupe toute la hauteur et la largeur disponibles.
            // - focus:outline-none : supprime les bordures par défaut lors du focus sur la zone de texte.
            // - resize-none : empêche l'utilisateur de redimensionner manuellement la zone de texte.
            className="bg-zinc-900 text-slate-200 text-xl p-8 block h-full w-full focus:outline-none resize-none"
        ></textarea>
    );
};

// Exportation par défaut du composant CodeTab afin qu'il puisse être utilisé ailleurs dans l'application.
export default CodeTab;