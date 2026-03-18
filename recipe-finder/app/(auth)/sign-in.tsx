import { useAuth, useSignIn, useUser } from '@clerk/clerk-expo'
import { Link, Redirect, useRouter } from 'expo-router'
import React from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import RecipeFinderLogo from '../components/RecipeFinderLogo'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const { isSignedIn } = useUser()
    const router = useRouter()
    const { getToken } = useAuth()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)

    if (isSignedIn) {
        return <Redirect href="/(home)/home" />
    }

    const onSignInPress = async () => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })

                // Now that the session is active, test the token
                await testToken()

                router.replace('/(home)/home')
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }


    if (isSignedIn) {
        router.replace('/(home)/home')
    }
    const testToken = async () => {
        try {
            const token = await getToken()
            console.log('Token retrieved:', token ? 'Token exists' : 'No token')

            const response = await fetch('http://192.168.0.105:5050/test', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log('Response status:', response.status)

            if (!response.ok) {
                const errorText = await response.text()
                console.error('Error response:', errorText)
                return
            }

            const data = await response.json()
            console.log('Success:', data)
        } catch (e) {
            console.error('Test token error:', e)
        }
    }
    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <RecipeFinderLogo size="large" />
                </View>

                {/* Decorative Elements */}
                <View style={styles.decorativeContainer}>
                    <Text style={styles.emoji}>🥘</Text>
                    <Text style={styles.emoji}>🍜</Text>
                    <Text style={styles.emoji}>🥗</Text>
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back! 👋</Text>
                    <Text style={styles.subtitle}>
                        Sign in to discover thousands of{'\n'}delicious recipes
                    </Text>
                </View>

                {/* Form Card */}
                <View style={styles.card}>
                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="your.email@example.com"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={setEmailAddress}
                            style={styles.input}
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Password</Text>
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forgot?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                                style={[styles.input, styles.passwordInput]}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onSignInPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <Link href="/sign-up">
                        <Text style={styles.link}> Sign up free</Text>
                    </Link>
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 20 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FFF6EE',
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
    },

    decorativeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },

    emoji: {
        fontSize: 32,
        opacity: 0.6,
        marginHorizontal: 10,
    },

    header: {
        alignItems: 'center',
        marginBottom: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E1E1E',
    },

    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B6B6B',
        marginTop: 8,
        lineHeight: 20,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    forgotText: {
        fontSize: 13,
        color: '#FF8C1A',
        fontWeight: '500',
    },

    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    passwordContainer: {
        position: 'relative',
    },

    passwordInput: {
        paddingRight: 50,
    },

    eyeButton: {
        position: 'absolute',
        right: 16,
        top: 14,
    },

    eyeIcon: {
        fontSize: 20,
    },

    button: {
        backgroundColor: '#FF8C1A',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#FF8C1A',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 4,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },

    dividerText: {
        marginHorizontal: 12,
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '500',
    },

    socialContainer: {
        flexDirection: 'row',
    },

    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginHorizontal: 6,
    },

    socialIcon: {
        fontSize: 20,
    },

    socialText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },

    footerText: {
        color: '#6B6B6B',
        fontSize: 14,
    },

    link: {
        color: '#FF8C1A',
        fontWeight: '600',
        fontSize: 14,
    },
})
