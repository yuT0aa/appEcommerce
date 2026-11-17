import { describe, it, expect } from 'vitest';
import reducer, {
  addToCart,
  removeFromCart,
  incrementQte,
  decrementQte,
} from '../redux/panierSlice';

describe('panierSlice', () => {
  const produit = { id: 1, intitule: 'Écran', prix: 1500 };

  it('doit ajouter un produit au panier', () => {
    const state = reducer({ items: [] }, addToCart(produit));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qte).toBe(1);
  });

  it('doit incrémenter la quantité si le produit existe déjà', () => {
    const state = reducer({ items: [{ ...produit, qte: 1 }] }, addToCart(produit));
    expect(state.items[0].qte).toBe(2);
  });

  it('doit incrémenter et décrémenter la quantité', () => {
    let state = reducer({ items: [{ ...produit, qte: 1 }] }, incrementQte(1));
    expect(state.items[0].qte).toBe(2);

    state = reducer(state, decrementQte(1));
    expect(state.items[0].qte).toBe(1);
  });

  it('doit supprimer un produit du panier', () => {
    const state = reducer({ items: [{ ...produit, qte: 2 }] }, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });
});