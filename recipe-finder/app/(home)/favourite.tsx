import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecipesCard from "../components/RecipesCard";
import { useFavorites } from "../context/FavoritesContext";
import { MOCK_RECIPES } from "../data/recipes";

export default function Favourite() {
    const { favorites } = useFavorites();
    const favoriteRecipes = MOCK_RECIPES.filter(recipe => favorites.includes(recipe.id));

    if (favoriteRecipes.length === 0) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Favourites</Text>
                    <Text style={styles.headerSubtitle}>
                        Your saved recipes
                    </Text>
                </View>

                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>❤️</Text>
                    <Text style={styles.emptyTitle}>No Favourites Yet</Text>
                    <Text style={styles.emptyText}>
                        Start adding your favorite recipes{'\n'}to see them here
                    </Text>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favourites</Text>
                <Text style={styles.headerSubtitle}>
                    {favoriteRecipes.length} saved recipe{favoriteRecipes.length !== 1 ? 's' : ''}
                </Text>
            </View>

            <View style={styles.recipeGrid}>
                {favoriteRecipes.map((recipe) => (
                    <RecipesCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        rating={recipe.rating}
                        time={`${recipe.prepTime + recipe.cookTime} min`}
                    />
                ))}
            </View>

            <View style={{ height: 80 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },

    header: {
        paddingTop: 16,
        paddingBottom: 20,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1E1E',
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#6B6B6B',
        marginTop: 4,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },

    emptyIcon: {
        fontSize: 80,
        marginBottom: 16,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 8,
    },

    emptyText: {
        fontSize: 14,
        color: '#6B6B6B',
        textAlign: 'center',
        lineHeight: 20,
    },

    recipeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
