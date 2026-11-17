import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  rechercherProduit,
  supprimerProduit,
  fetchProduits,
} from '../redux/produitSlice';
import { addToCart } from '../redux/panierSlice';

export default function Listproduits() {
  const dispatch = useDispatch();
  const { items, searchTerm, selectedCategorie, status } = useSelector(
    (state) => state.produits
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduits());
    }
  }, [status, dispatch]);

  const filteredProduits = items.filter((p) => {
    const matchSearch = p.intitule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat =
      selectedCategorie === 'Toutes' || p.categorie === selectedCategorie;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un produit par intitulé..."
          value={searchTerm}
          onChange={(e) => dispatch(rechercherProduit(e.target.value))}
        />
      </div>

      {status === 'loading' && <div className="alert alert-info">Chargement...</div>}

      <div className="row g-3">
        {filteredProduits.map((produit) => (
          <div className="col-md-4" key={produit.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={produit.image}
                className="card-img-top p-3"
                alt={produit.intitule}
                style={{ height: '180px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{produit.intitule}</h6>
                <span className="badge bg-secondary mb-2 align-self-start">
                  {produit.categorie}
                </span>
                <p className="fw-bold text-primary mt-auto">{produit.prix} DH</p>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-success btn-sm flex-grow-1"
                    onClick={() => dispatch(addToCart(produit))}
                  >
                    <i className="bi bi-cart-plus"></i> Ajouter
                  </button>
                  <Link
                    to={`/edit/${produit.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(supprimerProduit(produit.id))}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}