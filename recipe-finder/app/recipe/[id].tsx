import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { MOCK_RECIPES } from '../data/recipes';

export default function RecipeDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const { addToCart } = useCart();
    const [selectedTab, setSelectedTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');

    const recipe = MOCK_RECIPES.find(r => r.id === id);

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Recipe not found</Text>
            </View>
        );
    }

    const favorite = isFavorite(recipe.id);

    const handleFavoriteToggle = () => {
        if (favorite) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe.id);
        }
    };

    const handleOrderIngredients = () => {
        addToCart({
            recipeId: recipe.id,
            recipeTitle: recipe.title,
            ingredients: recipe.ingredients,
            quantity: 1,
        });
        router.push('/(home)/order');
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: recipe.image }} style={styles.image} />

                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>

                    {/* Favorite Button */}
                    <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
                        <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Recipe Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.description}>{recipe.description}</Text>

                    {/* Meta Info */}
                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>⭐</Text>
                            <Text style={styles.metaText}>{recipe.rating} ({recipe.reviews})</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>⏱️</Text>
                            <Text style={styles.metaText}>{recipe.prepTime + recipe.cookTime} min</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>👥</Text>
                            <Text style={styles.metaText}>{recipe.servings} servings</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>📊</Text>
                            <Text style={styles.metaText}>{recipe.difficulty}</Text>
                        </View>
                    </View>

                    {/* Author */}
                    <View style={styles.authorContainer}>
                        <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
                        <View>
                            <Text style={styles.authorLabel}>Recipe by</Text>
                            <Text style={styles.authorName}>{recipe.author.name}</Text>
                        </View>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'ingredients' && styles.tabActive]}
                            onPress={() => setSelectedTab('ingredients')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'ingredients' && styles.tabTextActive]}>
                                Ingredients
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'instructions' && styles.tabActive]}
                            onPress={() => setSelectedTab('instructions')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'instructions' && styles.tabTextActive]}>
                                Instructions
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'nutrition' && styles.tabActive]}
                            onPress={() => setSelectedTab('nutrition')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'nutrition' && styles.tabTextActive]}>
                                Nutrition
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tab Content */}
                    {selectedTab === 'ingredients' && (
                        <View style={styles.tabContent}>
                            {recipe.ingredients.map((ingredient) => (
                                <View key={ingredient.id} style={styles.ingredientItem}>
                                    <Text style={styles.ingredientCheckbox}>☑️</Text>
                                    <Text style={styles.ingredientText}>
                                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                                        {ingredient.optional && <Text style={styles.optional}> (optional)</Text>}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {selectedTab === 'instructions' && (
                        <View style={styles.tabContent}>
                            {recipe.instructions.map((instruction) => (
                                <View key={instruction.step} style={styles.instructionItem}>
                                    <View style={styles.stepNumber}>
                                        <Text style={styles.stepNumberText}>{instruction.step}</Text>
                                    </View>
                                    <View style={styles.instructionContent}>
                                        <Text style={styles.instructionText}>{instruction.text}</Text>
                                        {instruction.duration && (
                                            <Text style={styles.instructionDuration}>⏱️ {instruction.duration} min</Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {selectedTab === 'nutrition' && (
                        <View style={styles.tabContent}>
                            <View style={styles.nutritionGrid}>
                                <View style={styles.nutritionCard}>
                                    <Text style={styles.nutritionValue}>{recipe.nutrition.calories}</Text>
                                    <Text style={styles.nutritionLabel}>Calories</Text>
                                </View>
                                <View style={styles.nutritionCard}>
                                    <Text style={styles.nutritionValue}>{recipe.nutrition.protein}</Text>
                                    <Text style={styles.nutritionLabel}>Protein</Text>
                                </View>
                                <View style={styles.nutritionCard}>
                                    <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}</Text>
                                    <Text style={styles.nutritionLabel}>Carbs</Text>
                                </View>
                                <View style={styles.nutritionCard}>
                                    <Text style={styles.nutritionValue}>{recipe.nutrition.fat}</Text>
                                    <Text style={styles.nutritionLabel}>Fat</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Tips */}
                    {recipe.tips && recipe.tips.length > 0 && (
                        <View style={styles.tipsContainer}>
                            <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
                            {recipe.tips.map((tip, index) => (
                                <Text key={index} style={styles.tipText}>• {tip}</Text>
                            ))}
                        </View>
                    )}

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrderIngredients}>
                    <Text style={styles.orderButtonText}>🛒 Order Ingredients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cookButton}>
                    <Text style={styles.cookButtonText}>Start Cooking</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    imageContainer: {
        position: 'relative',
    },

    image: {
        width: '100%',
        height: 300,
    },

    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backIcon: {
        fontSize: 24,
    },

    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    favoriteIcon: {
        fontSize: 24,
    },

    contentContainer: {
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E1E1E',
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        color: '#6B6B6B',
        lineHeight: 22,
        marginBottom: 16,
    },

    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20,
    },

    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    metaIcon: {
        fontSize: 16,
    },

    metaText: {
        fontSize: 14,
        color: '#374151',
    },

    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: 20,
    },

    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    authorLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },

    authorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
    },

    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#F3F4F6',
        marginBottom: 20,
    },

    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },

    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF8C1A',
    },

    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9CA3AF',
    },

    tabTextActive: {
        color: '#FF8C1A',
        fontWeight: '600',
    },

    tabContent: {
        marginBottom: 20,
    },

    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        gap: 12,
    },

    ingredientCheckbox: {
        fontSize: 18,
    },

    ingredientText: {
        flex: 1,
        fontSize: 15,
        color: '#374151',
    },

    optional: {
        color: '#9CA3AF',
        fontSize: 13,
    },

    instructionItem: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },

    stepNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FF8C1A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    stepNumberText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    instructionContent: {
        flex: 1,
    },

    instructionText: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 22,
        marginBottom: 4,
    },

    instructionDuration: {
        fontSize: 13,
        color: '#FF8C1A',
    },

    nutritionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    nutritionCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: '#FFF6EE',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },

    nutritionValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FF8C1A',
        marginBottom: 4,
    },

    nutritionLabel: {
        fontSize: 13,
        color: '#6B6B6B',
    },

    tipsContainer: {
        backgroundColor: '#FFF6EE',
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
    },

    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 12,
    },

    tipText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
        marginBottom: 6,
    },

    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 12,
    },

    orderButton: {
        flex: 1,
        backgroundColor: '#FFF6EE',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FF8C1A',
    },

    orderButtonText: {
        color: '#FF8C1A',
        fontSize: 15,
        fontWeight: '600',
    },

    cookButton: {
        flex: 1,
        backgroundColor: '#FF8C1A',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },

    cookButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
});
