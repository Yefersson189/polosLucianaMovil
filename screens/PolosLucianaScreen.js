import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Alert } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { VacanciesContext } from '../context/VacanciesContext';
import { Picker } from '@react-native-picker/picker';  // Para el selector de tipo de reporte

// Componente para mostrar los detalles
const Detalles = ({ employee, onClose }) => {
    

    return (
        <View style={styles.detailsModalContainer}>
            <View style={styles.detailsHeader}>
                <Text style={styles.detailsHeaderText}>Detalles</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.whiteBoxContainer}>
                    <View style={styles.profileSection}>
                        <Image style={styles.profileImage} source={employee.imageSource} />
                        <View style={styles.rating}>
                            {[...Array(5)].map((_, i) => (
                                <Text key={i} style={styles.star}>★</Text>
                            ))}
                        </View>
                       
                    </View>

                    <View style={styles.separator}></View>

                        <View style={styles.tableRow}>
                            <Text style={styles.label}>Informacion:</Text>
                            <Text style={styles.info}>Polos Luciana</Text>
                        </View>
                    <View style={styles.infoTable}>
                        <View style={styles.tableRow}>
                            <Text style={styles.label}>Tipo de prenda:</Text>
                            <Text style={styles.info}>{employee.name}</Text>
                        </View>
                        
                        <View style={styles.tableRow}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.info}>example@example.com</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.label}>Talla:</Text>
                            <Text style={styles.info}>S,M,L,XL</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.label}>Ubicacion:</Text>
                            <Text style={styles.info}>cra 67 # 24-89</Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>

                    
                    <View style={styles.separator}></View>

                    <View style={styles.buttonSection}>
                        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContact}>
                            <Text style={styles.buttonText}>Contactar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// Componente principal para la polos Luciana
export default function PostulationEmpleado() {
    const [visibility, setVisibility] = useState([true, true, true]);
    const [searchText, setSearchText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [reportModalVisible, setReportModalVisible] = useState(false); // Modal para reporte
    const [thankYouVisible, setThankYouVisible] = useState(false); // Mensaje de agradecimiento
    const { vacancies, addToHistory } = useContext(VacanciesContext); // Acceder a addToHistory desde el contexto
    const [modalVisible, setModalVisible] = useState(false);

    // Estados del formulario de reporte
    const [tipo, setTipo] = useState('');
    const [motivo, setMotivo] = useState('');
    const [comentario, setComentario] = useState('');
    const [otroMotivo, setOtroMotivo] = useState(''); // Estado para el motivo cuando es 'Otro'
    const [errorMessage, setErrorMessage] = useState('');

    // Mostrar el modal de reporte
    const openReportModal = () => {
        setReportModalVisible(true);
    };

    const handleReportSubmit = () => {
        if (!tipo || (tipo === 'otro' && (!motivo || !otroMotivo)) || (tipo !== 'otro' && !motivo)) {
            setErrorMessage('Por favor, llena los campos "Tipo" y "Motivo", y especifica si seleccionas "Otro"');
        } else {
            setErrorMessage('');
            setReportModalVisible(false);
            
            // Enviar el proceso a Historial
            const reportProcess = tipo === 'otro' ? `Otro: ${otroMotivo}` : motivo;
            addToHistory(`Reporte generado: ${reportProcess}`); // Actualizamos el historial con el nuevo reporte

            // Limpiar los campos del formulario
            setTipo('');
            setMotivo('');
            setComentario('');
            setOtroMotivo('');

            // Mostrar mensaje de agradecimiento temporal
            setThankYouVisible(true);
            setTimeout(() => {
                setThankYouVisible(false);
            }, 3000);
        }
    };

    const [containers, setContainers] = useState([
        {
            id: 1,
            imageSource: require('../assets/producto1.png'),
            name: 'Polos Luciana',
            Talla: 'S,M,L,XL',
            experiencia: 'TU MEJOR ELECCION',
            time: new Date(),
        },
        {
            id: 2,
            imageSource: require('../assets/producto2.png'),
            name: 'Polos Luciana',
            Talla: 'S,M,L,XL',
            experiencia: 'TU MEJOR ELECCION',
            time: new Date(),
        },
        {
            id: 3,
            imageSource: require('../assets/producto3.png'),
            name: 'Polos Luciana',
            Talla: 'S,M,L,XL',
            experiencia: 'TU MEJOR ELECCION',
            time: new Date(),
        },
        {
          id: 4,
          imageSource: require('../assets/producto4.png'),
          name: 'Polos Luciana',
          Talla: 'S,M,L,XL',
          experiencia: 'TU MEJOR ELECCION',
          time: new Date(),
      },
      {
        id: 5,
        imageSource: require('../assets/producto5.png'),
        name: 'Polos Luciana',
        Talla: 'S,M,L,XL',
        experiencia: 'TU MEJOR ELECCION',
        time: new Date(),
    },
    ]);

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const openModal = (index) => {
        setSelectedIndex(index);
        setModalVisible(true);
    };

    const openDetailsModal = (employee) => {
        setSelectedEmployee(employee);
        setDetailsModalVisible(true);
    };

    const confirmAndClearContent = () => {
        const selectedVacancy = containers[selectedIndex]; 

        if (!selectedVacancy) {
            Alert.alert("Error", "No se encontró lo seleccionada.");
            return;
        }
        // Eliminar la vacante de la visibilidad
        setVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[selectedIndex] = false;
            return newVisibility;
        });

        // Registrar la eliminación en el historial
        addToHistory(`Eliminada: ${selectedVacancy.titulo}`);

        setModalVisible(false);
    };

    const filteredContainers = containers.filter(container =>
        container.name.toLowerCase().includes(searchText.toLowerCase()) ||
        container.vacante.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Mensaje de agradecimiento fijo */}
            {thankYouVisible && (
                <View style={styles.thankYouContainer}>
                    <Text style={styles.thankYouText}>¡Gracias por su reporte!</Text>
                </View>
            )}

            <ScrollView>
                <View style={styles.container}>
                    {/* Header principal */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>INVENTARIO</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <FontAwesome name="search" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar por nombre"
                            value={searchText}
                            onChangeText={handleSearch}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={{ color: '#263850', fontSize: 20, marginTop: 30, fontWeight: 'bold' }}>POLOS LUCIANA</Text>
                        <View style={styles.line}></View>
                    </View>

                    {filteredContainers.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No se encontro lo seleccionado.</Text>
                        </View>
                    ) : (
                        filteredContainers.map((container, index) => (
                            visibility[index] !== false && (
                                <View key={container.id} style={styles.sectionContainer}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.postTime}>
                                            {`Visto: Hace ${Math.floor((new Date() - container.time) / 60000)} minutos`}
                                        </Text>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => openModal(index)}>
                                            <FontAwesome name="close" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.imageContainer}>
                                        <Image source={container.imageSource} style={styles.image} />
                                    </View>

                                    <View style={styles.infoContainer}>
                    
                                        <Text><Text style={styles.labelBold}>Nombre:</Text> {container.name}</Text>
                                        <Text><Text style={styles.labelBold}>Talla:</Text> {container.Talla}</Text>
                                        <Text><Text style={styles.labelBold}>Experiencia </Text> {container.experiencia}</Text>
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.reportButton} onPress={openReportModal}>
                                            <FontAwesome name="exclamation-triangle" size={20} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => openDetailsModal(container)}>
                                            <Text style={styles.buttonText}>+ INFORMACIÓN</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        ))
                    )}
                    
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>CONFIRMACIÓN</Text>
                                <Text style={styles.modalMessage}>¿Estás seguro de eliminar este producto</Text>
                                <View style={styles.modalButtons}>
                                    <Pressable style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalButtonConfirm} onPress={confirmAndClearContent}>
                                        <Text style={styles.modalButtonText}>Confirmar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal de detalles */}
                    {detailsModalVisible && (
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={detailsModalVisible}
                            onRequestClose={() => setDetailsModalVisible(false)}
                        >
                            <Detalles
                                employee={selectedEmployee}
                                onClose={() => setDetailsModalVisible(false)}
                            />
                        </Modal>
                    )}

                    {/* Modal de Reporte */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={reportModalVisible}
                        onRequestClose={() => setReportModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>Comentario</Text>

                                <Text style={styles.label}>Tipo:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={tipo}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => {
                                            setTipo(itemValue);
                                            if (itemValue) setErrorMessage(''); // Limpiar mensaje de error si ya hay un tipo seleccionado
                                        }}
                                    >
                                        <Picker.Item label="Selecciona un tipo" value="" />
                                        <Picker.Item label="Otro" value="otro" />
                                    </Picker>
                                </View>

                                {/* Mostrar campo adicional cuando se selecciona 'Otro' */}
                                {tipo === 'otro' && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Escribe el motivo"
                                        placeholderTextColor="#888"
                                        value={otroMotivo}
                                        onChangeText={setOtroMotivo}
                                    />
                                )}

                                <Text style={styles.label}>Motivo:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cuentanos Tu Experiencia"
                                    placeholderTextColor="#888"
                                    value={motivo}
                                    onChangeText={(text) => {
                                        setMotivo(text);
                                        if (text) setErrorMessage(''); // Limpiar mensaje de error si ya hay un motivo escrito
                                    }}
                                />

                                {/* Mostrar el mensaje de error aquí entre Motivo y Comentario */}
                                {errorMessage ? (
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                ) : null}

                                <Text style={styles.label}>Comentario:</Text>
                                <TextInput
                                    style={styles.textArea}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Comentarios adicionales"
                                    placeholderTextColor="#888"
                                    value={comentario}
                                    onChangeText={setComentario}
                                />

                                <View style={styles.buttonContainerModal}>
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => setReportModalVisible(false)}>
                                        <Text style={styles.buttonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sendButton} onPress={handleReportSubmit}>
                                        <Text style={styles.buttonText}>Enviar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
    },
  
    
    headerContainer: {
      width: "100%",
      height: 120,
      backgroundColor: "#029FF0",
      alignItems: "center",
      justifyContent: "center", // Centra el texto verticalmente
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      marginTop: 20
    },
  
    // Estilos para la búsqueda
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      borderColor: "#029FF0",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "#fff",
      marginTop: 30,
      marginBottom: 10,
      paddingLeft: 10,
    },
    searchIcon: { fontSize: 20, marginRight: 10, color: "#029FF0" },
    searchInput: { height: 40, flex: 1 },
  
    // Estilos para el título y la línea separadora
    titleContainer: { width: 300, alignItems: "center" },
    line: { width: "100%", borderWidth: 0.5, borderColor: "#bbb" },
  
    // Estilos para las secciones de contenedores de empleados
    sectionContainer: {
      borderWidth: 2,
      borderColor: "#E1EAF7", // Azul claro para el borde
      backgroundColor: '#FFFFFF', // Fondo blanco
      shadowColor: '#000', // Sombras suaves para darle profundidad
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      width: 320, // Ancho más amplio para organizar mejor la información
      maxHeight: 1000,
      borderRadius: 15, // Bordes redondeados
      marginTop: 20,
      marginBottom: 10,
      padding: 20, // Más espacio interior para una mejor presentación
      alignItems: "center",
      position: "relative",
    },
    postTime: {
      color: "#888", // Color gris suave para la fecha de publicación
      marginBottom: 10,
    },
    closeButton: {
      position: 'absolute',
        top: -20,
        right: -75,
        backgroundColor: '#029FF0',
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 7,
        padding: 10,
        elevation: 2,
    },
    imageContainer: { 
      alignItems: "center", 
      marginTop: 10 
    },
    image: { 
      width: 90, 
      height: 120, 
      borderRadius: 15 
    },
    infoContainer: {
      alignItems: "flex-start", // Alinear la información a la izquierda para una lectura más fluida
      marginTop: 15,
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#029FF0', // Azul para los títulos de las secciones
      marginTop: 20,
      marginBottom: 10,
    },
    labelBold: {
      fontWeight: 'bold',
      color: '#263850',
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#029FF0",
      borderRadius: 15,
      padding: 10,
      marginHorizontal: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    reportButton: {
      position: 'absolute',
        bottom: -20, // Posicionado en la parte inferior
        left: -80, // Posicionado en la parte izquierda
        backgroundColor: '#029FF0',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 7,
        padding: 10,
        elevation: 2,
    },
    // Modal y otros estilos se mantienen igual
    pickerContainer: {
        width: '100%',
        borderColor: '#029FF0',  // Borde azul más delgado
        borderWidth: 1, // Reducción del grosor del borde
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center', // Centrar verticalmente
    },
    picker: {
        height: 40,
        width: '100%',
        color: '#000',
        textAlign: 'center',  // Centramos el texto horizontalmente
        paddingLeft: 0,  // Eliminamos el padding izquierdo que puede descentrar el texto
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textArea: {
        height: 80,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    buttonContainerModal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
      backgroundColor: '#ddd',
      padding: 10,
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    sendButton: {
      backgroundColor: '#00A3FF',
      padding: 10,
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    thankYouContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#263850',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999, // Asegura que siempre esté por encima del contenido
  },    
    thankYouText: {
      color: '#52A0F1',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginBottom: 15,
      textAlign: 'center',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
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
    modalButtons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    modalButtonCancel: {
      backgroundColor: '#ddd',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    modalButtonConfirm: {
      backgroundColor: '#029FF0',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },

    // Estilos para el modal de detalles
    detailsModalContainer: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    detailsHeader: {
      height: 60,
      backgroundColor: "#2196F3",
      justifyContent: "center",
      alignItems: "center",
    },
    detailsHeaderText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },
    whiteBoxContainer: {
      backgroundColor: "#fff",
      margin: 20,
      padding: 20,
      borderRadius: 10,
    },
  
    // Perfil y calificación
    profileSection: {
      alignItems: "center",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    rating: {
      flexDirection: "row",
      marginVertical: 10,
    },
    star: {
      fontSize: 20,
      color: "#FFD700",
    },
    ratingText: {
      fontSize: 16,
      color: "#000",
    },
  
    // Separador
    separator: {
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
      marginVertical: 10,
    },
  
    // Información de la tabla
    infoTable: {
      marginBottom: 20,
      maxWidth: 300
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    label: {
      fontWeight: "bold",
      fontSize: 16,
    },
    info: {
      fontSize: 16,
    },
  
    // Botones en el modal
    buttonSection: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonClose: {
      backgroundColor: "#2C3E50",
      padding: 10,
      borderRadius: 5,
      width: 120,
      alignItems: "center",
      marginRight: 10,
    },
    buttonContact: {
      backgroundColor: "#029FF0",
      padding: 10,
      borderRadius: 5,
      width: 120,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  
    
  
});
