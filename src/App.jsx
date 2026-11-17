import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductForm from './components/ProductForm';
import Panier from './components/Panier';

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<ProductForm/>}/>
          <Route path="/edit/:id" element={<ProductForm/>}/>
          <Route path="/panier" element={<Panier/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;