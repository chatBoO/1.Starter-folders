// Importation de React pour créer des composants fonctionnels.
import React from "react";

// Importation de la fonction useSelector depuis react-redux pour accéder à l'état global de Redux.
import { useSelector } from "react-redux";

// Définition du composant Preview, qui affiche un aperçu en direct du code HTML, CSS et JavaScript.
const Preview = () => {
    
    // Utilisation de useSelector pour récupérer les données des onglets (tabs) depuis l'état global de Redux.
    // On suppose que l'état tabs contient une liste d'objets représentant chaque onglet, avec des propriétés comme 'lang' et 'code'.
    const tabs = useSelector((state) => state.tabs);

    // Fonction getCode qui prend un langage (lang) en paramètre et retourne le code associé à ce langage
    // (par exemple, HTML, CSS ou JavaScript) en recherchant dans l'état des onglets (tabs).
    const getCode = (lang) => tabs.find((obj) => obj.lang === lang).code;

    // Construction dynamique du contenu de l'iframe avec la balise srcDoc.
    // Le contenu est un document HTML complet, avec :
    // - Le code CSS inséré dans la balise <style> dans le <head>.
    // - Le code HTML inséré directement dans le <body>.
    // - Le code JavaScript inséré dans une balise <script> à la fin du <body>.
    const srcDoc = `
    <!DOCTYPE html>
    <html>
        <head>
            <style>${getCode("css")}</style>
        </head>
        <body>
        ${getCode("html")}
        <script>${getCode("javascript")}</script>
        </body>
    </html>
    `;

    // Le composant retourne un div qui occupe toute la fenêtre (w-full h-full) avec un fond sombre (bg-zinc-900).
    // À l'intérieur de ce div, il y a un iframe qui affiche le contenu généré par srcDoc.
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-900">
            {/* L'iframe affiche le contenu HTML/CSS/JS généré précédemment via srcDoc. */}
            {/* La propriété sandbox="allow-scripts" permet d'exécuter les scripts JavaScript tout en appliquant certaines restrictions de sécurité. */}
            <iframe
                className="block w-full h-full"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
            ></iframe>
        </div>
    );
};

// Exportation par défaut du composant Preview pour qu'il puisse être utilisé ailleurs dans l'application.
export default Preview;