import Filter from './Filter';
import Listproduits from './Listproduits';

export default function Home() {
  return (
    <div className="row">
      {/* 25% = 3 colonnes sur 12 */}
      <div className="col-md-3 mb-3">
        <Filter />
      </div>
      {/* 75% = 9 colonnes sur 12 */}
      <div className="col-md-9">
        <Listproduits />
      </div>
    </div>
  );
}