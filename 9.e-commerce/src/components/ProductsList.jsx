import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../features/products"; // Action pour récupérer les produits
import { addOneToCart } from "../features/cart"; // Action pour ajouter un produit au panier

const ProductsList = () => {
    // Sélection des produits depuis le state Redux
    const products = useSelector((state) => state.products);

    // Initialisation du dispatch pour envoyer des actions Redux
    const dispatch = useDispatch();

    // Chargement des produits au montage du composant si non disponibles
    useEffect(() => {
        if (!products.items) {
            dispatch(getProductsList()); // Récupère les produits via une action asynchrone
        }
    }, [dispatch, products.items]);

    return (
        <div className="px-6">
            {/* Titre de la liste des produits */}
            <h1 className="text-slate-100 text-2xl mb-6">Voici nos produits</h1>

            {/* Liste des produits affichée sous forme de grille */}
            <ul className="grid min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
                {products.items &&
                    products.items.map((product) => (
                        <li
                            key={product.id}
                            className="p-4 bg-slate-200 rounded"
                        >
                            {/* Image du produit */}
                            <img
                                className="mb-4"
                                src={`/images/${product.img}.png`}
                                alt={product.title}
                            />

                            {/* Informations sur le produit */}
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-slate-700 text-lg">
                                    {product.title}
                                </p>
                                <p className="text-slate-900 font-bold">
                                    {product.price} €
                                </p>
                            </div>

                            {/* Bouton pour ajouter au panier */}
                            <button
                                onClick={() =>
                                    dispatch(addOneToCart(product.id))
                                }
                                className={`${
                                    product.picked
                                        ? "bg-green-700"
                                        : "bg-slate-600"
                                } w-full text-slate-100 px-2 inline-flex items-center justify-center rounded p-2`}
                            >
                                {product.picked
                                    ? "Article sélectionné ☑️"
                                    : "Ajouter au panier"}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ProductsList;
