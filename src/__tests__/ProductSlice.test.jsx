import { describe, it, expect } from 'vitest';
import reducer, {
  ajouterProduit,
  modifierProduit,
  supprimerProduit,
  rechercherProduit,
  filtrerParCategorie,
} from '../redux/produitSlice';

describe('produitSlice', () => {
  const initialState = {
    items: [{ id: 1, intitule: 'Clavier', prix: 200, categorie: 'Info', image: '' }],
    searchTerm: '',
    selectedCategorie: 'Toutes',
    status: 'idle',
    error: null,
  };

  it('doit ajouter un produit', () => {
    const newProd = { intitule: 'Souris', prix: 100, categorie: 'Info', image: '' };
    const state = reducer(initialState, ajouterProduit(newProd));
    expect(state.items).toHaveLength(2);
    expect(state.items[1].intitule).toBe('Souris');
  });

  it('doit modifier un produit existant', () => {
    const updated = { id: 1, intitule: 'Clavier Mécanique', prix: 450, categorie: 'Info', image: '' };
    const state = reducer(initialState, modifierProduit(updated));
    expect(state.items[0].intitule).toBe('Clavier Mécanique');
    expect(state.items[0].prix).toBe(450);
  });

  it('doit supprimer un produit', () => {
    const state = reducer(initialState, supprimerProduit(1));
    expect(state.items).toHaveLength(0);
  });

  it('doit mettre à jour le terme de recherche', () => {
    const state = reducer(initialState, rechercherProduit('Clav'));
    expect(state.searchTerm).toBe('Clav');
  });

  it('doit filtrer par catégorie', () => {
    const state = reducer(initialState, filtrerParCategorie('Info'));
    expect(state.selectedCategorie).toBe('Info');
  });
});