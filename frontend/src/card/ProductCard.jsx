import { Link } from 'react-router-dom'
import { useCart } from '../crartDrawer/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="w-72 flex-shrink-0 group cursor-pointer" style={{ scrollSnapAlign: 'start' }}>
      <div className="overflow-hidden relative bg-[#f2f0ed] dark:bg-[#1e1e1e]" style={{ aspectRatio: '3/4' }}>
        <Link to={`/product/${product.productId || product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-montserrat font-semibold py-3 tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-black"
        >
          + ADD TO BASKET
        </button>
      </div>

      <Link to={`/product/${product.productId || product.id}`}>
        <h2 className="mt-2 text-sm font-montserrat font-medium hover:underline dark:text-white">{product.name}</h2>
      </Link>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
        ${product.price.toLocaleString()}
      </p>
    </div>
  )
}

export default ProductCard
