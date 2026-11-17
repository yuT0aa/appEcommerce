import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  incrementQte,
  decrementQte,
} from '../redux/panierSlice';

export default function Panier() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.panier.items);

  const prixTotal = items.reduce((total, item) => total + item.prix * item.qte, 0);

  if (items.length === 0) {
    return <div className="alert alert-warning">Votre panier est vide.</div>;
  }

  return (
    <div>
      <h3>Votre Panier</h3>
      <table className="table table-bordered align-middle mt-3">
        <thead className="table-light">
          <tr>
            <th>Produit</th>
            <th>Prix Unitaire</th>
            <th>Quantité</th>
            <th>Sous-total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.intitule}</td>
              <td>{item.prix} DH</td>
              <td>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => dispatch(decrementQte(item.id))}
                >
                  -
                </button>
                <span className="mx-2 fw-bold">{item.qte}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => dispatch(incrementQte(item.id))}
                >
                  +
                </button>
              </td>
              <td>{item.prix * item.qte} DH</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <i className="bi bi-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h4>Total : <span className="text-success">{prixTotal} DH</span></h4>
      </div>
    </div>
  );
}
