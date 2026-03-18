import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecipeFinderLogo from "../components/RecipeFinderLogo";
import SignOutButton from "../components/SignOutButton";

export default function Profile() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <RecipeFinderLogo size="medium" />
            </View>

            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: user.imageUrl }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>
                    {user.firstName || user.username || 'User'}
                </Text>
                <Text style={styles.email}>
                    {user.emailAddresses[0]?.emailAddress}
                </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Recipes</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
                <MenuItem icon="⚙️" title="Settings" />
                <MenuItem icon="📝" title="My Recipes" />
                <MenuItem icon="❤️" title="Saved Recipes" />
                <MenuItem icon="🔔" title="Notifications" />
                <MenuItem icon="ℹ️" title="About" />
                <MenuItem icon="❓" title="Help & Support" />
            </View>

            {/* Sign Out */}
            <View style={styles.signOutContainer}>
                <SignOutButton />
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function MenuItem({ icon, title }: { icon: string; title: string }) {
    return (
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{icon}</Text>
                <Text style={styles.menuTitle}>{title}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    logoContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },

    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FF8C1A',
        marginBottom: 16,
    },

    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1E1E',
        marginBottom: 4,
    },

    email: {
        fontSize: 14,
        color: '#6B6B6B',
    },

    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 12,
    },

    statCard: {
        flex: 1,
        backgroundColor: '#FFF6EE',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFE5CC',
    },

    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FF8C1A',
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 12,
        color: '#6B6B6B',
    },

    menuContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
    },

    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    menuIcon: {
        fontSize: 22,
    },

    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E1E1E',
    },

    menuArrow: {
        fontSize: 24,
        color: '#9CA3AF',
    },

    signOutContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});
