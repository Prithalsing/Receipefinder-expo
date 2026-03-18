import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import AuthBottomSheet from "./components/AuthBottomSheet";
import RecipeFinderLogo from "./components/RecipeFinderLogo";

const PlaceHolder = require("@/assets/images/image.png");

export default function Page() {
    const { isSignedIn } = useUser()
    const [showAuthSheet, setShowAuthSheet] = useState(false);

    if (isSignedIn) {
        return <Redirect href="/(home)/home" />
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={PlaceHolder}
                style={styles.background}
                resizeMode="cover"
            >
                <StatusBar barStyle="dark-content" />

                <RecipeFinderLogo />

                {/* Content Wrapper */}
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Get the food recipe{"\n"}more easier!
                        </Text>

                        <Text style={styles.subtitle}>
                            Let's make a delicious dish with the best recipe
                            {"\n"}for the family
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => setShowAuthSheet(true)}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </Pressable>
                </View>
            </ImageBackground>

            {/* Auth Bottom Sheet */}
            <AuthBottomSheet
                visible={showAuthSheet}
                onClose={() => setShowAuthSheet(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff3d782",
    },

    background: {
        flex: 1,
    },

    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 20,
    },

    textContainer: {
        alignItems: "center",
        paddingHorizontal: 30,
        marginTop: 120,
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        color: "#0f0e0e",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#6B6B6B",
        lineHeight: 20,
    },

    button: {
        backgroundColor: "#FF8C1A",
        width: "80%",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
