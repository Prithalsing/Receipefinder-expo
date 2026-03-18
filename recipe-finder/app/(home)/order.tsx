import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function Order() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Cart</Text>
                </View>

                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🛒</Text>
                    <Text style={styles.emptyTitle}>Cart is Empty</Text>
                    <Text style={styles.emptyText}>
                        Add ingredients from recipes{'\n'}to see them here
                    </Text>
                    <TouchableOpacity style={styles.browseButton} onPress={() => router.push('/(home)/home')}>
                        <Text style={styles.browseButtonText}>Browse Recipes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Cart</Text>
                    <TouchableOpacity onPress={clearCart}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                </View>

                {cart.map((item) => (
                    <View key={item.recipeId} style={styles.cartItem}>
                        <View style={styles.cartItemHeader}>
                            <Text style={styles.recipeTitle}>{item.recipeTitle}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item.recipeId)}>
                                <Text style={styles.removeIcon}>🗑️</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ingredientsList}>
                            {item.ingredients.map((ingredient) => (
                                <Text key={ingredient.id} style={styles.ingredientText}>
                                    • {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantityLabel}>Sets:</Text>
                            <View style={styles.quantityControls}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => item.quantity > 1 && updateQuantity(item.recipeId, item.quantity - 1)}
                                >
                                    <Text style={styles.quantityButtonText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityValue}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.recipeId, item.quantity + 1)}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.priceText}>${10 * item.quantity}</Text>
                        </View>
                    </View>
                ))}

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Checkout Footer */}
            <View style={styles.checkoutFooter}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${getCartTotal()}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },

    header: {
        paddingTop: 16,
        paddingBottom: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1E1E',
    },

    clearText: {
        fontSize: 14,
        color: '#FF8C1A',
        fontWeight: '500',
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
        marginBottom: 24,
    },

    browseButton: {
        backgroundColor: '#FF8C1A',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 14,
    },

    browseButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },

    cartItem: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },

    cartItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    recipeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        flex: 1,
    },

    removeIcon: {
        fontSize: 20,
    },

    ingredientsList: {
        marginBottom: 12,
    },

    ingredientText: {
        fontSize: 13,
        color: '#6B6B6B',
        lineHeight: 20,
    },

    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
    },

    quantityLabel: {
        fontSize: 14,
        color: '#6B6B6B',
    },

    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FF8C1A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },

    quantityValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        minWidth: 24,
        textAlign: 'center',
    },

    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF8C1A',
    },

    checkoutFooter: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        backgroundColor: '#FFF',
        padding: 16,
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    totalLabel: {
        fontSize: 16,
        color: '#6B6B6B',
    },

    totalAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1E1E',
    },

    checkoutButton: {
        backgroundColor: '#FF8C1A',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },

    checkoutButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
