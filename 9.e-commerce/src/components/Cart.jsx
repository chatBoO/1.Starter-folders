import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItemFromSelect, deleteFromCart } from "../features/cart";

const Cart = ({ onClose }) => {
    // Sélection des articles du panier depuis le state Redux
    const cart = useSelector((state) => state.cart);

    // Initialisation du dispatch pour envoyer des actions Redux
    const dispatch = useDispatch();

    // Calcul du total du panier
    const totalPrice = cart.cartItems
        .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
        .toFixed(2);

    return (
        <div
            onClick={onClose} // Ferme le modal lorsqu'on clique en dehors de la boîte
            className="fixed inset-0 bg-slate-700/75 flex justify-center items-center z-10"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Empêche la propagation pour ne pas fermer le modal en cliquant à l'intérieur
                className="z-20 relative bg-slate-300 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 rounded border border-slate-600 mb-[10vh]"
            >
                {/* Bouton pour fermer le modal */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                    aria-label="Close cart"
                >
                    X
                </button>

                {/* Liste des articles dans le panier */}
                <ul>
                    {cart.cartItems.length > 0 ? (
                        cart.cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center mb-4"
                            >
                                {/* Image du produit */}
                                <img
                                    className="w-16 h-16 rounded"
                                    src={`/images/${item.img}.png`}
                                    alt={item.title}
                                />

                                {/* Titre du produit */}
                                <p className="mr-auto ml-2 text-lg font-semibold">
                                    {item.title}
                                </p>

                                {/* Sélecteur de quantité */}
                                <select
                                    name="quantity"
                                    className="w-20 p-2 rounded mr-4"
                                    onChange={(e) =>
                                        dispatch(
                                            updateItemFromSelect({
                                                value: e.target.value,
                                                id: item.id,
                                            })
                                        )
                                    }
                                    value={item.quantity}
                                >
                                    {[...Array(6).keys()].map((num) => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* Bouton pour supprimer l'article du panier */}
                                <button
                                    onClick={() =>
                                        dispatch(deleteFromCart(item.id))
                                    }
                                    className="bg-slate-900 text-slate-200 px-2 inline-flex items-center justify-center rounded p-2"
                                >
                                    Remove from cart
                                </button>
                            </li>
                        ))
                    ) : (
                        // Message si le panier est vide
                        <li className="mb-4 text-center">
                            Add some items to your cart...
                        </li>
                    )}
                </ul>

                {/* Total du panier */}
                <p className="text-xl mt-6">
                    Your total:{" "}
                    <span className="font-semibold">{totalPrice} $</span>
                </p>

                {/* Bouton pour aller à la caisse */}
                {cart.cartItems.length > 0 && (
                    <button className="block mx-auto bg-slate-800 text-slate-200 rounded px-4 py-2 mt-7 hover:bg-slate-700 transition">
                        Proceed to checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
