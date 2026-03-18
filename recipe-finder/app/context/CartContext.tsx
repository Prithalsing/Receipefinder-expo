import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/recipe';

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (recipeId: string) => void;
    updateQuantity: (recipeId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.recipeId === item.recipeId);
            if (existing) {
                return prev.map(i =>
                    i.recipeId === item.recipeId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (recipeId: string) => {
        setCart(prev => prev.filter(item => item.recipeId !== recipeId));
    };

    const updateQuantity = (recipeId: string, quantity: number) => {
        setCart(prev =>
            prev.map(item =>
                item.recipeId === recipeId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        // Simplified: $10 per recipe set of ingredients
        return cart.reduce((total, item) => total + (10 * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
