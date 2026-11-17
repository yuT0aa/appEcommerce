import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ajouterProduit, modifierProduit } from '../redux/produitSlice';

export default function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingProduct = useSelector((state) =>
    state.produits.items.find((p) => p.id === Number(id))
  );

  const [formData, setFormData] = useState({
    intitule: '',
    prix: '',
    categorie: '',
    image: '',
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData(existingProduct);
    }
  }, [existingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, prix: Number(formData.prix) };

    if (id) {
      dispatch(modifierProduit({ ...payload, id: Number(id) }));
    } else {
      dispatch(ajouterProduit(payload));
    }
    navigate('/');
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h4>{id ? 'Modifier le produit' : 'Ajouter un produit'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Intitulé</label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.intitule}
            onChange={(e) => setFormData({ ...formData, intitule: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix (DH)</label>
          <input
            type="number"
            className="form-control"
            required
            value={formData.prix}
            onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.categorie}
            onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Image</label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {id ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}