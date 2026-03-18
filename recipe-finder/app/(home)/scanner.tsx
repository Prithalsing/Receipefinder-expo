import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Scanner() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Scan Recipe</Text>
                <Text style={styles.headerSubtitle}>
                    Point your camera at a recipe or ingredient
                </Text>
            </View>

            <View style={styles.scannerFrame}>
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />

                <View style={styles.scanArea}>
                    <Text style={styles.scanIcon}>📷</Text>
                    <Text style={styles.scanText}>Camera Scanner</Text>
                    <Text style={styles.scanSubtext}>
                        Scan barcodes or QR codes on recipes
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.galleryButton}>
                    <Text style={styles.galleryIcon}>🖼️</Text>
                    <Text style={styles.galleryText}>Choose from Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 20,
    },

    header: {
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
    },

    scannerFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    cornerTopLeft: {
        position: 'absolute',
        top: 50,
        left: 30,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#FF8C1A',
        borderTopLeftRadius: 12,
    },

    cornerTopRight: {
        position: 'absolute',
        top: 50,
        right: 30,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#FF8C1A',
        borderTopRightRadius: 12,
    },

    cornerBottomLeft: {
        position: 'absolute',
        bottom: 150,
        left: 30,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#FF8C1A',
        borderBottomLeftRadius: 12,
    },

    cornerBottomRight: {
        position: 'absolute',
        bottom: 150,
        right: 30,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#FF8C1A',
        borderBottomRightRadius: 12,
    },

    scanArea: {
        alignItems: 'center',
    },

    scanIcon: {
        fontSize: 80,
        marginBottom: 16,
    },

    scanText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },

    scanSubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },

    footer: {
        paddingBottom: 40,
    },

    galleryButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 14,
        gap: 8,
    },

    galleryIcon: {
        fontSize: 20,
    },

    galleryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
    },
});
