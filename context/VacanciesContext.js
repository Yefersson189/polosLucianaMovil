import React, { createContext, useState } from 'react';

// Crea el contexto
export const VacanciesContext = createContext();

// Proveedor del contexto
export const VacanciesProvider = ({ children }) => {
    const [vacancies, setVacancies] = useState([]);
    const [history, setHistory] = useState([]);
    const [isEmployee, setIsEmployee] = useState(true); // Estado para manejar el rol (empleado o empleador)

    // Función para alternar el rol entre empleado y empleador
    const toggleRole = () => {
        setIsEmployee(prevIsEmployee => !prevIsEmployee);
    };

    // Función para agregar una nueva vacante
    const addVacancy = (newVacancy) => {
        setVacancies((prevVacancies) => [
            ...prevVacancies,
            { id: prevVacancies.length + 1, ...newVacancy }
        ]);

        // Agregar la acción de creación al historial
        addToHistory(`Creada vacante: ${newVacancy.titulo}`);
    };

    // Función para actualizar una vacante existente
    const updateVacancy = (updatedVacancy) => {
        setVacancies((prevVacancies) =>
            prevVacancies.map(vacancy =>
                vacancy.id === updatedVacancy.id ? updatedVacancy : vacancy
            )
        );

        // Agregar la acción de edición al historial
        addToHistory(`Editada vacante: ${updatedVacancy.titulo}`);
    };

    // Función para eliminar una vacante
    const deleteVacancy = (vacancyId) => {
        const deletedVacancy = vacancies.find(vacancy => vacancy.id === vacancyId);
        if (deletedVacancy) {
            setVacancies((prevVacancies) =>
                prevVacancies.filter(vacancy => vacancy.id !== vacancyId)
            );

            // Agregar la acción de eliminación al historial
            addToHistory(`Eliminada vacante: ${deletedVacancy.titulo}`);
        }
    };

    // Función para agregar cualquier reporte o proceso al historial
    const addToHistory = (processDescription) => {
        setHistory((prevHistory) => [
            ...prevHistory,
            {
                id: Math.random().toString(),
                date: new Date().toISOString(),
                process: processDescription
            }
        ]);
    };

    return (
        <VacanciesContext.Provider value={{
            vacancies, 
            addVacancy, 
            updateVacancy, 
            deleteVacancy, 
            history, 
            setHistory, 
            addToHistory, 
            isEmployee,  // Exponer el estado del rol
            toggleRole   // Exponer la función para cambiar el rol
        }}>
            {children}
        </VacanciesContext.Provider>
    );
};
