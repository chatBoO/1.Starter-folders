import { useState } from "react"; // Importation du hook useState pour gérer l'état local du composant.
import ButtonTab from "./ButtonTab"; // Importation du composant ButtonTab, utilisé pour afficher chaque onglet.
import CodeTab from "./CodeTab"; // Importation du composant CodeTab, utilisé pour afficher et éditer le code de l'onglet actif.
import { useSelector } from "react-redux"; // Importation de useSelector pour accéder à l'état global de Redux.
import Preview from "./Preview"; // Importation du composant Preview, qui affiche un aperçu du code HTML/CSS/JS.

const Tabs = () => {
    // Utilisation de useSelector pour récupérer la liste des onglets depuis l'état global de Redux.
    const tabs = useSelector((state) => state.tabs);

    // Utilisation de useSelector pour récupérer les données liées à l'aperçu (preview) depuis Redux.
    const previewData = useSelector((state) => state.preview);

    // Utilisation de useState pour gérer l'onglet actuellement sélectionné. Par défaut, on sélectionne le premier onglet (tabs[0].id).
    const [tabIndex, setTabIndex] = useState(tabs[0].id);

    return (
        <div className="flex grow">
            {/* Colonne gauche contenant les boutons des onglets */}
            <div className="flex grow flex-col w-[175px] shrink-0 text-slate-300 border-r border-slate-200">
                {/* Boucle sur les onglets pour créer un bouton par onglet */}
                {tabs.map((tab) => (
                    <ButtonTab
                        key={tab.id} // Clé unique basée sur l'ID de l'onglet.
                        id={tab.id} // ID de l'onglet.
                        toggleTab={(id) => setTabIndex(id)} // Fonction pour changer d'onglet lorsqu'un bouton est cliqué.
                        imgURL={tab.imgURL} // URL de l'image associée à l'onglet (probablement une icône).
                        buttonContent={tab.buttonContent} // Texte ou contenu à afficher dans le bouton.
                    />
                ))}
            </div>

            {/* Zone principale à droite qui affiche le contenu de l'onglet sélectionné */}
            <div className="w-full grow relative">
                {/* Composant CodeTab qui affiche et permet d'éditer le code de l'onglet actif */}
                <CodeTab
                    id={tabIndex} // ID de l'onglet actuellement actif.
                    code={tabs.find((obj) => obj.id === tabIndex).code} // Récupération du code associé à cet onglet.
                />

                {/* Si l'aperçu est activé (previewData.preview est vrai), on affiche le composant Preview */}
                {previewData.preview && <Preview />}
            </div>
        </div>
    );
};

export default Tabs;
