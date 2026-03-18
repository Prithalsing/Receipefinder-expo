import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
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

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')

    const onSignUpPress = async () => {
        if (!isLoaded) return

        if (password !== confirmPassword) {
            console.error('Passwords do not match')
            return
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
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

                    {/* Verification Icon */}
                    <View style={styles.verificationIcon}>
                        <Text style={styles.largeEmoji}>📧</Text>
                    </View>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Check Your Email</Text>
                        <Text style={styles.subtitle}>
                            We've sent a verification code to{'\n'}
                            <Text style={styles.emailHighlight}>{emailAddress}</Text>
                        </Text>
                    </View>

                    {/* Verification Form */}
                    <View style={styles.card}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Verification Code</Text>
                            <TextInput
                                value={code}
                                placeholder="Enter 6-digit code"
                                placeholderTextColor="#9CA3AF"
                                onChangeText={setCode}
                                style={styles.codeInput}
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={onVerifyPress}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Verify & Continue</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resendButton}>
                            <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
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
                    <Text style={styles.emoji}>🍕</Text>
                    <Text style={styles.emoji}>🥐</Text>
                    <Text style={styles.emoji}>🍰</Text>
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Join thousands of food lovers finding{'\n'}their next favorite recipe
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
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                placeholder="At least 8 characters"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                                style={[styles.input, styles.passwordInput]}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={confirmPassword}
                                placeholder="Re-enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showConfirmPassword}
                                onChangeText={setConfirmPassword}
                                style={[styles.input, styles.passwordInput]}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms */}
                    <Text style={styles.termsText}>
                        By signing up, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onSignUpPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <Link href="/sign-in">
                        <Text style={styles.link}> Sign in</Text>
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
        flex: 1,
        backgroundColor: '#FFF6EE',
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    decorativeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },

    emoji: {
        fontSize: 32,
        opacity: 0.6,
    },

    verificationIcon: {
        alignItems: 'center',
        marginBottom: 16,
    },

    largeEmoji: {
        fontSize: 64,
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

    emailHighlight: {
        color: '#FF8C1A',
        fontWeight: '600',
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

    codeInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        textAlign: 'center',
        letterSpacing: 8,
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

    termsText: {
        fontSize: 12,
        color: '#6B6B6B',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 18,
    },

    termsLink: {
        color: '#FF8C1A',
        fontWeight: '500',
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

    resendButton: {
        marginTop: 16,
        alignItems: 'center',
    },

    resendText: {
        fontSize: 13,
        color: '#6B6B6B',
    },

    resendLink: {
        color: '#FF8C1A',
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
        gap: 12,
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
        gap: 8,
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