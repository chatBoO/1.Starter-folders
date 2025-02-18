// Importation de la fonction createSlice depuis Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// État initial du slice cart
const initialState = {
    cartItems: [], // Liste des articles dans le panier
};

// Définition du slice cart
export const cart = createSlice({
    name: "cart", // Nom du slice
    initialState, // État initial
    reducers: {
        // Action pour ajouter un nouvel article au panier
        createCartItem: (state, action) => {
            state.cartItems.push(action.payload); // Ajoute l'article à la liste
        },
        // Action pour mettre à jour la quantité d'un article dans le panier
        updateItemFromSelect: (state, action) => {
            const item = state.cartItems.find(
                (el) => el.id === action.payload.id
            ); // Recherche de l'article correspondant
            if (item) {
                item.quantity = Number(action.payload.value); // Mise à jour de la quantité si l'article est trouvé
            }
        },
        // Action pour supprimer un article du panier
        deleteFromCart: (state, action) => {
            const indexOfItemToRemove = state.cartItems.findIndex(
                (el) => el.id === action.payload // Recherche de l'index de l'article à supprimer
            );
            if (indexOfItemToRemove !== -1) {
                state.cartItems.splice(indexOfItemToRemove, 1); // Suppression de l'article si trouvé
            }
        },
    },
});

// Thunk pour ajouter un article au panier avec gestion des doublons
export const addOneToCart = (id) => {
    return (dispatch, getState) => {
        const storeState = getState(); // Récupération de l'état global

        // Vérifie si l'article est déjà présent dans le panier
        const isAlreadyPresent = storeState.cart.cartItems.find(
            (el) => el.id === id
        );

        if (!isAlreadyPresent) {
            // Recherche de l'article dans la liste des produits disponibles
            const itemToAdd = storeState.products.items?.find(
                (el) => el.id === id
            );

            if (itemToAdd) {
                const newCartItem = {
                    ...itemToAdd,
                    quantity: 1, // Initialise la quantité à 1 pour un nouvel article
                };

                dispatch(createCartItem(newCartItem)); // Ajoute l'article au panier via Redux
            } else {
                console.error(
                    `Produit avec l'ID ${id} introuvable dans les produits.`
                );
            }
        }
    };
};

// Exportation des actions pour utilisation dans d'autres parties de l'application
export const { createCartItem, updateItemFromSelect, deleteFromCart } =
    cart.actions;

// Exportation du reducer pour l'intégrer au store Redux
export default cart.reducer;
