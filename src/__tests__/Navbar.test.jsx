import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import panierReducer from '../redux/panierSlice';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('affiche les liens de navigation et le compteur du panier', () => {
    const mockStore = configureStore({
      reducer: { panier: panierReducer },
      preloadedState: {
        panier: { items: [{ id: 1, intitule: 'PC', prix: 5000, qte: 3 }] },
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/E-Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Produits/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajouter Produit/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});