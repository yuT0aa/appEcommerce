import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduits = createAsyncThunk(
  'produits/fetchProduits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      return data.map((item) => ({
        id: item.id,
        intitule: item.title,
        prix: item.price,
        categorie: item.category,
        image: item.image,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const produitSlice = createSlice({
  name: 'produits',
  initialState: {
    items: [],
    searchTerm: '',
    selectedCategorie: 'Toutes',
    status: 'idle',
    error: null,
  },
  reducers: {
    ajouterProduit: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    modifierProduit: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    supprimerProduit: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    rechercherProduit: (state, action) => {
      state.searchTerm = action.payload;
    },
    filtrerParCategorie: (state, action) => {
      state.selectedCategorie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProduits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  ajouterProduit,
  modifierProduit,
  supprimerProduit,
  rechercherProduit,
  filtrerParCategorie,
} = produitSlice.actions;

export default produitSlice.reducer;