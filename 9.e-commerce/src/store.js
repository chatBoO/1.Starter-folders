import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Importer redux-thunk
import products from "./features/products";
import cart from "./features/cart";

export const store = configureStore({
    reducer: {
        products,
        cart,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Ajouter le middleware thunk
});
