import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RecipeFinderLogoProps {
    size?: 'small' | 'medium' | 'large';
}

export default function RecipeFinderLogo({ size = 'medium' }: RecipeFinderLogoProps) {
    const sizeStyles = {
        small: { fontSize: 18, iconSize: 24 },
        medium: { fontSize: 24, iconSize: 32 },
        large: { fontSize: 32, iconSize: 42 },
    };

    const currentSize = sizeStyles[size];

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { width: currentSize.iconSize, height: currentSize.iconSize }]}>
                <Text style={[styles.icon, { fontSize: currentSize.iconSize * 0.7 }]}>🍳</Text>
            </View>
            <Text style={[styles.text, { fontSize: currentSize.fontSize }]}>
                Recipe <Text style={styles.accent}>Finder</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    iconContainer: {
        backgroundColor: '#FF8C1A',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF8C1A',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    icon: {
        textAlign: 'center',
    },

    text: {
        fontWeight: '700',
        color: '#1E1E1E',
    },

    accent: {
        color: '#FF8C1A',
    },
});
