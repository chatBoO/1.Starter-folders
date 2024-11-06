// Importation des composants Tabs et PreviewButton depuis le répertoire components.
import Tabs from "./components/Tabs";
import PreviewButton from "./components/PreviewButton";

// Définition du composant principal App, qui constitue la structure de l'application.
function App() {
    return (
        // Le conteneur principal utilise Tailwind CSS pour définir un fond sombre (bg-zinc-900),
        // une hauteur minimale de l'écran (min-h-screen), et une disposition en flexbox verticale (flex flex-col).
        <div className="bg-zinc-900 min-h-screen flex flex-col">
            
            {/* Barre supérieure contenant le titre de l'application, le bouton d'aperçu et des icônes */}
            <div className="px-4 py-4 border-b flex items-center">
                
                {/* Titre de l'application, centré verticalement avec un texte blanc (text-slate-50) et une taille de police de 2xl */}
                <h1 className="w-full text-slate-50 text-2xl">
                    <span>the</span>SmartIDE
                </h1>
                
                {/* Conteneur pour le bouton d'aperçu (PreviewButton) */}
                <div className="w-full flex">
                    <PreviewButton />
                </div>
                
                {/* Conteneur pour les trois petits cercles à droite, qui ressemblent à des boutons d'une fenêtre */}
                <div className="w-full flex">
                    <div className="ml-auto mr-2">  {/* Positionne les cercles à droite avec ml-auto */}
                        {/* Chaque div représente un petit cercle avec une largeur et hauteur de 6px, un fond gris clair et des coins arrondis */}
                        <div className="w-[6px] h-[6px] bg-slate-200 rounded-full my-1"></div>
                        <div className="w-[6px] h-[6px] bg-slate-200 rounded-full my-1"></div>
                        <div className="w-[6px] h-[6px] bg-slate-200 rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Composant Tabs qui gère les onglets et l'édition du code */}
            <Tabs />
        </div>
    );
}

// Exportation par défaut du composant App pour qu'il puisse être utilisé comme point d'entrée dans l'application.
export default App;