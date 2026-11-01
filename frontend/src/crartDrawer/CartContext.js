import { createContext, useContext, useState, createElement } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);

    const addToCart = (product) => {
        const exists = cartItems.find((item) => item.id === product.id);
        if (exists) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        openCart();
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const increaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        cartOpen,
        cartItems,
        total,
        addToCart,
        openCart,
        closeCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
    };

    // Use createElement instead of JSX — .js files don't support JSX syntax
    return createElement(CartContext.Provider, { value }, children);
};

export const useCart = () => useContext(CartContext);