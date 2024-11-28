import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Navigation from "./navigation/Navigation";
import { VacanciesProvider } from './context/VacanciesContext';
// import { auth } from "./firebase";

export default function App() {
  return (
    <VacanciesProvider>
        <Navigation />
    </VacanciesProvider>
);
}
