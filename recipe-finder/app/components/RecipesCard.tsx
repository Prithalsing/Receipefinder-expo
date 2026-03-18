import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";

type RecipeCardProps = {
    id: string;
    title: string;
    image: string;
    rating: number;
    time: string;
};

export default function RecipesCard({
    id,
    title,
    image,
    rating,
    time,
}: RecipeCardProps) {
    const router = useRouter();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(id);

    const handlePress = () => {
        router.push(`/recipe/${id}` as any);
    };

    const handleFavoriteToggle = (e: any) => {
        e.stopPropagation();
        if (favorite) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    };

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
                    <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                <View style={styles.meta}>
                    <Text style={styles.metaText}>⭐ {rating}</Text>
                    <Text style={styles.metaText}>⏱ {time}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
    },

    imageContainer: {
        position: 'relative',
    },

    image: {
        width: "100%",
        height: 120,
        borderRadius: 12,
        marginBottom: 10,
    },

    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    favoriteIcon: {
        fontSize: 18,
    },

    info: {
        gap: 6,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    meta: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    metaText: {
        fontSize: 12,
        color: "#6B7280",
    },
});
