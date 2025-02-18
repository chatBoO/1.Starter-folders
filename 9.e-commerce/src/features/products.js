// Importation de la fonction createSlice depuis Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// État initial du slice products
const initialState = {
    items: undefined, // Liste des produits (initialement non définie)
};

// Définition du slice products
export const products = createSlice({
    name: "products", // Nom du slice
    initialState, // État initial
    reducers: {
        // Action pour ajouter des produits à l'état
        addProducts: (state, action) => {
            state.items = action.payload; // Met à jour la liste des produits avec les données reçues
        },
    },
    extraReducers: {
        // Gestion d'une action externe : marquer un produit comme "picked" lorsqu'il est ajouté au panier
        ["cart/createCartItem"]: (state, action) => {
            const product = state.items?.find(
                (el) => el.id === action.payload.id
            ); // Recherche du produit correspondant
            if (product) product.picked = true; // Marque le produit comme sélectionné si trouvé
        },
        // Gestion d'une action externe : retirer le statut "picked" lorsqu'un produit est supprimé du panier
        ["cart/deleteFromCart"]: (state, action) => {
            const product = state.items?.find((el) => el.id === action.payload); // Recherche du produit correspondant
            if (product) product.picked = false; // Réinitialise le statut si trouvé
        },
    },
});

// Thunk pour récupérer la liste des produits depuis un fichier JSON distant
export const getProductsList = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("./data/inventory.json"); // Requête pour récupérer les données
            if (!response.ok) throw new Error("Erreur réseau"); // Vérification de la réponse HTTP
            const data = await response.json(); // Conversion en JSON
            dispatch(addProducts(data.products)); // Dispatch des produits dans le store Redux
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des produits :",
                error
            ); // Gestion des erreurs
        }
    };
};

// Exportation de l'action addProducts pour utilisation dans d'autres composants ou fichiers
export const { addProducts } = products.actions;

// Exportation du reducer pour l'intégrer au store Redux
export default products.reducer;
