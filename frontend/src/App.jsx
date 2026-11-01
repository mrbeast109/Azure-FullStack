import { Routes, Route } from 'react-router-dom'
import {Home, New, Collection, About, Login, Signup, Checkout, Navbar, Footer, ProductDetail} from './components/index'
import AuthProvider from './context/AuthContext';
import { CartProvider } from './crartDrawer/CartContext';
import CartDrawer from './crartDrawer/CartDrawer';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div>
            <Navbar />
            <CartDrawer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/newarrivals" element={<New />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
