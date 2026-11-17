import {Link} from 'react-router-dom';
import {useSelector} from 'react-reduc'

function Navbar(){
    const panierItems=useSelector((state)=>state.panier.items);
    const totalQte=panierItems.reduce((sum,item)=>sum+item.qte,0);

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand fw-bold" to="/">
               <i className="bi bi-shop me-2"></i>E-Shop
            </Link>
            <div className="navbar-nav ms-auto d-flex flex-row gap-3">
                <Link className="nav-link" to="/">Produits</Link>
                <Link className="nav-link" to="/add">Ajouter Produit</Link>
                <Link className="nav-link position-relative" to="/panier">
                    <i className="bi bi-cart3 me-1"></i>Panier
                    <span className="badge bg-danger ms-1">{totalQte}</span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;