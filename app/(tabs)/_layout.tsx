import { Tabs } from 'expo-router';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: 'Mis reservaciones',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="book" size={24} color="#c3c5d3" />
          ),
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="user" size={24} color="c3c5d3" />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="excursion"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
