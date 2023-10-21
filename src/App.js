import './App.css';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

function App() {

  return (
    <div>      
      <BrowserRouter basename ="/">
          <Routes>
            <Route exact path="/" element={<ProductList/>} />
            <Route exact path="/add-product" element={<AddProductForm  />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
