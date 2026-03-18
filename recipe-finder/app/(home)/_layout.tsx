import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function HomeLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#FF8C1A',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22 }}>{focused ? '🏠' : '🏚️'}</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: 'Order',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22 }}>{focused ? '🛒' : '🛍️'}</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="scanner"
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                backgroundColor: '#FF8C1A',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: -25,
                                shadowColor: '#FF8C1A',
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                elevation: 8,
                            }}
                        >
                            <Text style={{ fontSize: 26 }}>📷</Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: 'Favourite',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22 }}>{focused ? '❤️' : '🤍'}</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22 }}>{focused ? '👤' : '👥'}</Text>
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="index"
                options={{
                    href: null, // 👈 hides it completely
                }}
            />
        </Tabs>
    );
}
