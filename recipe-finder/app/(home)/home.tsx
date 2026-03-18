import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import RecipeFinderLogo from "../components/RecipeFinderLogo";
import RecipesCard from "../components/RecipesCard";
import { CATEGORIES, MOCK_RECIPES } from "../data/recipes";
// import { recipeAPI, Recipe } from "../../services/api";


export default function Home() {
    const { user } = useUser();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    // const [recipes, setRecipes] = useState<Recipe[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    if (!user) return null;

    // // Fetch recipes from backend on mount
    // useEffect(() => {
    //     fetchRecipes();
    // }, []);

    // const fetchRecipes = async () => {
    //     try {
    //         setLoading(true);
    //         setError(null);

    //         const response = await recipeAPI.getRecipes(getToken);
    //         console.log('✅ Fetched recipes from backend:', response.count);

    //         setRecipes(response.recipes);
    //     } catch (err) {
    //         console.error('❌ Failed to fetch recipes:', err);
    //         setError(err instanceof Error ? err.message : 'Failed to load recipes');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Filter recipes based on search and category
    const filteredRecipes = MOCK_RECIPES.filter((recipe) => {
        const matchesSearch = searchQuery === "" ||
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "all" ||
            recipe.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <RecipeFinderLogo />
                </View>

                <View style={styles.bell}>
                    <Text style={{ fontSize: 18 }}>🔔</Text>
                </View>
            </View>

            {/* SEARCH */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search Recipe..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInput}
                />
                <TouchableOpacity style={styles.searchBtn}>
                    <Text style={{ color: "#fff", fontWeight: "700" }}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* PROMO BANNER */}
            <View style={styles.banner}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.bannerTitle}>
                        Free Delivery For{'\n'}Chicken Burger
                    </Text>
                    <Text style={styles.bannerSub}>Up to 3 times per day</Text>

                    <View style={styles.bannerBtn}>
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Order Now</Text>
                    </View>
                </View>

                {/* <Image
                    source={require("@/assets/images/burger.png")}
                    style={styles.bannerImg}
                /> */}
            </View>

            {/* CATEGORIES */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Food categories</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.category,
                            selectedCategory === category.id && styles.categoryActive,
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                        <Text style={selectedCategory === category.id ? styles.categoryTextActive : styles.categoryText}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* RECENT RECIPES */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {searchQuery || selectedCategory !== "all"
                        ? `Found ${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''}`
                        : 'Recent recipes'}
                </Text>
            </View>

            <View style={styles.recipeGrid}>
                {filteredRecipes.map((recipe: any) => (
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

            {filteredRecipes.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🔍</Text>
                    <Text style={styles.emptyText}>
                        No recipes found{'\n'}Try a different search or category
                    </Text>
                </View>
            )}

            <View style={{ height: 80 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    recipeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },

    hello: {
        fontSize: 12,
        color: "#6B7280",
    },

    username: {
        fontSize: 16,
        fontWeight: "700",
    },

    bell: {
        backgroundColor: "#F3F4F6",
        padding: 10,
        borderRadius: 20,
    },

    searchContainer: {
        flexDirection: "row",
        marginVertical: 20,
    },

    searchInput: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 48,
    },

    searchBtn: {
        backgroundColor: "#FF8C1A",
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },

    banner: {
        backgroundColor: "#1F2937",
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },

    bannerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    bannerSub: {
        color: "#D1D5DB",
        fontSize: 12,
        marginVertical: 6,
    },

    bannerBtn: {
        backgroundColor: "#FF8C1A",
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 6,
    },

    bannerImg: {
        width: 90,
        height: 90,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
    },

    viewAll: {
        fontSize: 12,
        color: "#FF8C1A",
    },

    category: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#F3F4F6",
        borderRadius: 14,
        marginRight: 10,
        gap: 6,
    },

    categoryActive: {
        backgroundColor: "#FF8C1A",
    },

    categoryIcon: {
        fontSize: 18,
    },

    categoryText: {
        color: "#374151",
        fontSize: 13,
    },

    categoryTextActive: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    recipeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    recipeCard: {
        width: "48%",
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        padding: 12,
    },

    recipeImg: {
        width: "100%",
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },

    recipeTitle: {
        fontWeight: "600",
    },

    emptyState: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
    },

    emptyIcon: {
        fontSize: 60,
        marginBottom: 12,
    },

    emptyText: {
        fontSize: 14,
        color: "#9CA3AF",
        textAlign: "center",
        lineHeight: 20,
    },
});
