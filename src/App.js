import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './commponents/Header/Header';
import Products from './commponents/Products';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
