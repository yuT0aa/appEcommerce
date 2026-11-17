import { useDispatch, useSelector } from 'react-redux';
import { filtrerParCategorie } from '../redux/produitSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const { items, selectedCategorie } = useSelector((state) => state.produits);
  const categories = ['Toutes', ...new Set(items.map((p) => p.categorie))];

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Catégories</h5>
      {categories.map((cat) => (
        <div className="form-check mb-2" key={cat}>
          <input
            className="form-check-input"
            type="radio"
            name="categorieRadio"
            id={`cat-${cat}`}
            value={cat}
            checked={selectedCategorie === cat}
            onChange={(e) => dispatch(filtrerParCategorie(e.target.value))}
          />
          <label className="form-check-label" htmlFor={`cat-${cat}`}>
            {cat}
          </label>
        </div>
      ))}
    </div>
  );
}