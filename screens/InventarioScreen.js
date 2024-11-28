import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VacanciesContext } from '../context/VacanciesContext';

// Función para formatear el valor con separador de millas
const formatCurrency = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const InventarioScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Para obtener los datos del inventario

    const { addVacancy, updateVacancy } = useContext(VacanciesContext); // Obtener las funciones del contexto

    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar el modal de alerta
    const [missingFields, setMissingFields] = useState([]); // Almacena los campos faltantes
    const [input, setInput] = useState({
        employer: '',
        title: '',
        description: '',
        neighborhood: '',
        payment: '',
        experience: '',
        category: '',
        duration: '',
    });
    const [profileImage, setProfileImage] = useState(null); // Imagen seleccionada
    const [time, setTime] = useState(new Date()); // Inicializamos el estado 'time'

    // Efecto para llenar los campos si estamos editando una vacante
    useEffect(() => {
        if (route.params?.vacancy) {
            const vacancy = route.params.vacancy;
            setInput({
                employer: vacancy.employer,
                title: vacancy.titulo,
                description: vacancy.descripcion,
                neighborhood: vacancy.barrio,
                payment: vacancy.valor.replace(' pesos', '').replace(/\./g, ''), // Eliminar formato para reutilizar
                experience: vacancy.experiencia,
                category: vacancy.categoria,
                duration: vacancy.duracion,
            });
            setProfileImage(vacancy.imageSource.uri); // Cargar la imagen si existe

            // Verificamos si 'time' existe antes de intentar convertirlo
            if (vacancy.time) {
                setTime(new Date(vacancy.time)); // Convierte el string ISO en un objeto Date
            }
        }
    }, [route.params]);

    // Función para seleccionar una imagen
    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Se requiere permiso para acceder a la galería.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                setProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error al seleccionar la imagen: ', error);
        }
    };

    // Función para procesar la creación o edición de la vacante
    const handleProcess = async () => {
        const emptyFields = [];
        for (const key in input) {
            if (!input[key]) {
                emptyFields.push(key);
            }
        }

        // Si no hay imagen, agrega "Imagen" a los campos faltantes
        if (!profileImage) {
            emptyFields.push('image');
        }

        // Si faltan campos, muestra la alerta
        if (emptyFields.length > 0) {
            setMissingFields(emptyFields);
            setShowAlert(true); // Mostrar la alerta personalizada
            return;
        }

        setLoading(true);

        // Formatear el valor antes de guardarlo
        const formattedPayment = `${formatCurrency(input.payment)} pesos`;

        const newVacancy = {
            id: route.params?.vacancy?.id || Math.random().toString(),
            nombre: input.employer,
            titulo: input.title,
            descripcion: input.description,
            barrio: input.neighborhood,
            valor: formattedPayment,
            experiencia: input.experience,
            categoria: input.category,
            duracion: input.duration,
            imageSource: { uri: profileImage }, // Imagen obligatoria
            time: route.params?.vacancy?.time || new Date() // Mantener el tiempo original si es una edición
        };

        // Si es una edición, llamamos a updateVacancy
        if (route.params?.vacancy) {
            updateVacancy(newVacancy);
        } else {
            // Si es una nueva vacante, llamamos a addVacancy
            addVacancy(newVacancy);
        }

        setLoading(false);
        setInput({
            employer: '',
            title: '',
            description: '',
            neighborhood: '',
            payment: '',
            experience: '',
            category: '',
            duration: '',
        });
        setProfileImage(null);
        navigation.goBack(); // Volver a la pantalla anterior
    };

    // Etiquetas de campos obligatorios
    const fieldLabel = {
        user: 'Nombre del comprador',
        title: 'Título de la vacante',
        description: 'Descripción',
        neighborhood: 'Barrio',
        payment: 'Valor',

    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.section}>
                <Text style={styles.title}>{route.params?.vacancy ? 'Editar Compra' : 'TU COMPRA'}</Text>
                <View style={styles.line} />
                
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>DATOS</Text>
                </TouchableOpacity>
                {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

                <TextInput
                    style={styles.input}
                    placeholder="Nombre del Comprador"
                    value={input.employer}
                    onChangeText={(text) => setInput({ ...input, employer: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripcion"
                    value={input.title}
                    onChangeText={(text) => setInput({ ...input, title: text })}
                />
                  <TextInput
                    style={styles.input}
                    placeholder="Celular"
                    value={input.payment}
                    onChangeText={(text) => setInput({ ...input, payment: text })}
                    keyboardType="numeric"
                    maxLength={10}
                />
               
                <TextInput
                    style={styles.input}
                    placeholder="Barrio"
                    value={input.neighborhood}
                    onChangeText={(text) => setInput({ ...input, neighborhood: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    value={input.payment}
                    onChangeText={(text) => setInput({ ...input, payment: text })}
                    keyboardType="numeric"
                    maxLength={10}
                />
               
               

                <View style={styles.contentButton}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity style={styles.buttonPublic} onPress={handleProcess}>
                            <Text style={styles.buttonText}>
                                {route.params?.vacancy ? 'ACTUALIZAR' : 'COMPRAR'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Modal para la alerta personalizada */}
            <Modal transparent={true} animationType="slide" visible={showAlert} onRequestClose={() => setShowAlert(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Campos obligatorios faltantes</Text>
                        <Text style={styles.modalMessage}>
                            Los siguientes campos son obligatorios y deben completarse:
                        </Text>
                        {missingFields.map((field) => (
                            <Text key={field} style={styles.missingField}>
                                - {fieldLabel[field]}
                            </Text>
                        ))}
                        <TouchableOpacity style={styles.modalButton} onPress={() => setShowAlert(false)}>
                            <Text style={styles.modalButtonText}>ENTENDIDO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    section: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#029FF0',
        borderWidth: 2,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        color: '#029FF0',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#029FF0',
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
    },
    uploadButton: {
        backgroundColor: '#029FF0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        alignSelf: 'center',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    contentButton: {
        marginTop: 20,
    },
    buttonPublic: {
        backgroundColor: '#029FF0',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    missingField: {
        fontSize: 14,
        marginBottom: 5,
        color: 'red',
    },
    modalButton: {
        backgroundColor: '#029FF0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default InventarioScreen;
