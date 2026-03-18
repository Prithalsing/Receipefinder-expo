import React, { createContext, ReactNode, useContext, useState } from 'react';

type FavoritesContextType = {
    favorites: string[];
    addFavorite: (recipeId: string) => void;
    removeFavorite: (recipeId: string) => void;
    isFavorite: (recipeId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    const addFavorite = (recipeId: string) => {
        setFavorites(prev => [...prev, recipeId]);
    };

    const removeFavorite = (recipeId: string) => {
        setFavorites(prev => prev.filter(id => id !== recipeId));
    };

    const isFavorite = (recipeId: string) => {
        return favorites.includes(recipeId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}
