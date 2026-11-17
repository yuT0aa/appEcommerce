import {configureStore} from '@reduxjs/toolkit';
import produitReducer from './produitSlice';
import panierReducer from './panierSlice';

export const store=configureStore({
    reducer:{
        produits:produitReducer,
        panier:panierReducer,
    },
});