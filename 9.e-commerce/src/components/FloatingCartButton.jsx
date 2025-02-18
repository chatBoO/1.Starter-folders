import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import ShoppingCart from "../assets/shopping-cart.svg"; // Icône du panier
import Cart from "./Cart"; // Composant pour afficher le contenu du panier

const FloatingCartButton = () => {
    // État local pour gérer l'affichage du modal
    const [showModal, setShowModal] = useState(false);

    // Sélection des articles du panier depuis le state Redux
    const cart = useSelector((state) => state.cart);

    // Nombre d'articles dans le panier
    const cartItemCount = cart.cartItems.length;

    return (
        <>
            {/* Bouton flottant pour ouvrir/fermer le panier */}
            <button
                onClick={() => setShowModal(!showModal)}
                className="fixed py-2 px-4 top-5 right-5 bg-slate-100 rounded flex justify-center items-center shadow-lg hover:bg-slate-200 transition"
                aria-label={`View your cart: ${cartItemCount} items`}
            >
                {/* Icône du panier */}
                <img
                    className="w-6 h-6 mr-4"
                    src={ShoppingCart}
                    alt="Shopping cart"
                />

                {/* Texte indiquant le nombre d'articles */}
                <span className="text-lg font-semibold">
                    View your cart: {cartItemCount}
                </span>
            </button>

            {/* Modal affiché lorsque showModal est true */}
            {showModal &&
                createPortal(
                    <Cart onClose={() => setShowModal(false)} />, // Composant Cart avec gestion de fermeture
                    document.body // Monté dans le DOM via un portail React
                )}
        </>
    );
};

export default FloatingCartButton;
