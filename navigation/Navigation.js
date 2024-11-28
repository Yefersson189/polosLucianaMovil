import React, { useState, useEffect } from "react";
import { View, Image, Text, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importa las pantallas
import HomeUsuario from "../screens/HomeUsuarioScreen";
import HomeAdministrador from "../screens/HomeAdministradorScreen"; // Cambiado a HomeAdministrador
import PolosLuciana from "../screens/PolosLucianaScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import Historial from "../screens/Historial";
import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import InventarioScreen from "../screens/InventarioScreen";

import { VacanciesProvider } from '../context/VacanciesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para HomeUsuario
function HomeUsuarioTabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // Ocultar el Tab Bar
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // Mostrar el Tab Bar
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "InicioUsuario") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "PerfilUsuario") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "HistorialUsuario") {
            iconName = focused ? "time" : "time-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { display: isKeyboardVisible ? "none" : "flex" }, // Oculta el Tab Bar cuando el teclado está visible
        tabBarActiveTintColor: "#3bb4f3",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="InicioUsuario"
        component={HomeUsuario}
        options={{ tabBarLabel: "Inicio Usuario" }}
      />
      <Tab.Screen
        name="PerfilUsuario"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil Usuario" }}
      />
      <Tab.Screen
        name="HistorialUsuario"
        component={Historial}
        options={{ tabBarLabel: "Historial Usuario" }}
      />
    </Tab.Navigator>
  );
}

// Tab Navigator para las pantallas principales (HomeAdministrador)
function MainTabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // Ocultar el Tab Bar
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // Mostrar el Tab Bar
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Historial") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Inventario") {
            iconName = focused ? "book" : "book-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { display: isKeyboardVisible ? "none" : "flex" }, // Oculta el Tab Bar cuando el teclado está visible
        tabBarActiveTintColor: "#3bb4f3",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeAdministrador} // Cambiado a HomeAdministrador
        options={{ tabBarLabel: "Inicio" }}
      />
      <Tab.Screen
        name="Inventario"
        component={PolosLuciana}
        options={{ tabBarLabel: "PolosLuciana" }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{ tabBarLabel: "Historial" }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator para manejar el flujo de autenticación y pantallas principales
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Pantallas de autenticación */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla principal con el Tab Navigator */}
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />

      {/* Pantalla Home Usuario con Tab Navigator */}
      <Stack.Screen
        name="HomeUsuarioScreen"
        component={HomeUsuarioTabNavigator} // Aquí llamamos al Tab Navigator de usuario
        options={{ headerShown: false }}
      />

      {/* Pantalla de detalles de trabajo */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: true, title: "Detalles" }}
      />

      {/* Agrega SettingScreen con header oculto */}
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InventarioScreen"
        component={InventarioScreen}
        options={{
          headerStyle: {
            backgroundColor: "#029FF0",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            height: 120,
          },
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 75, height: 45 }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons
              name="arrow-back"
              size={30}
              color="#fff"
              style={{ marginLeft: 20 }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <VacanciesProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </VacanciesProvider>
  );
}
