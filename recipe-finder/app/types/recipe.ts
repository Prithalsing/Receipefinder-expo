// Recipe Types
export type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    prepTime: number; // minutes
    cookTime: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string[];
    cuisine: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    nutrition: Nutrition;
    tips?: string[];
    author: {
        name: string;
        avatar: string;
    };
};

export type Ingredient = {
    id: string;
    name: string;
    amount: string;
    unit: string;
    optional?: boolean;
};

export type Instruction = {
    step: number;
    text: string;
    duration?: number; // minutes
    image?: string;
};

export type Nutrition = {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber?: string;
};

export type Category = {
    id: string;
    name: string;
    icon: string;
    recipeCount: number;
};

export type CartItem = {
    recipeId: string;
    recipeTitle: string;
    ingredients: Ingredient[];
    quantity: number;
};

export type Order = {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'delivered';
    date: string;
};
