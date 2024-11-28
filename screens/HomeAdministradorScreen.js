import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Alert } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { VacanciesContext } from '../context/VacanciesContext';
import { Picker } from '@react-native-picker/picker';  // Para el selector de tipo de reporte

export default function CrudEmpleador() {
    const navigation = useNavigation();
    const { vacancies, addToHistory } = useContext(VacanciesContext); // Acceder a addToHistory desde el contexto
    const [searchText, setSearchText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [acceptModalVisible, setAcceptModalVisible] = useState(false);
    const [visibility, setVisibility] = useState(vacancies.map(() => true));
    const [reportModalVisible, setReportModalVisible] = useState(false); // Modal para reporte
    const [thankYouVisible, setThankYouVisible] = useState(false); // Mensaje de agradecimiento

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
    
    const getTimeAgo = (date) => {
        const now = new Date();
        const differenceInMinutes = Math.floor((now - new Date(date)) / 60000);
        if (differenceInMinutes < 1) return "Visto: Hace menos de un minuto";
        if (differenceInMinutes === 1) return "Visto: Hace 1 minuto";
        return `Visto: Hace ${differenceInMinutes} minutos`;
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const openModal = (index) => {
        setSelectedIndex(index);

        
        setModalVisible(true);
    };

    const confirmAndClearContent = () => {
        const selectedVacancy = vacancies[selectedIndex];
        
        // Eliminar la vacante de la visibilidad
        setVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[selectedIndex] = false;
            return newVisibility;
        });

        // Registrar la eliminación en el historial
        addToHistory(`Eliminada Compra: ${selected.titulo}`);

        setModalVisible(false);
    };

    const openAcceptModal = (index) => {
        setSelectedIndex(index);
        setAcceptModalVisible(true);
    };

    const confirmAndAccept = () => {
        setAcceptModalVisible(false);
        Alert.alert("Articulo en tu inventario", "El articulo fue agregado a tu inventario.");
    };

    // Filtrar las vacantes según el texto de búsqueda (ahora filtramos por "nombre" del autor, título de la vacante y barrio)
    const filteredContainers = vacancies.filter(vacancy => {
        const authorName = vacancy.nombre ? vacancy.nombre.toLowerCase() : ''; // Cambié name a nombre
        const title = vacancy.titulo ? vacancy.titulo.toLowerCase() : '';
        const neighborhood = vacancy.barrio ? vacancy.barrio.toLowerCase() : '';

        return authorName.includes(searchText.toLowerCase()) || 
               title.includes(searchText.toLowerCase()) || 
               neighborhood.includes(searchText.toLowerCase());
    });

    const handleInventario = () => {
        navigation.navigate('Inventario');
    };

    const handleEditJob = (vacancy) => {
        const serializedVacancy = {
          ...vacancy,
          employer: vacancy.nombre, // Aseguramos que el campo 'nombre' se pase como 'employer'
          time: vacancy.time instanceof Date ? vacancy.time.toISOString() : new Date().toISOString(), // Solo convertir si es una instancia de Date
        };
        navigation.navigate('InventarioScreen', { vacancy: serializedVacancy });
    };
    
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
                    <View style={styles.headerContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/logo.jpg')} style={styles.logoImage} />
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 3 }}>~ Nos Definen La Elegancia</Text>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 3 }}> Y Los Buenos Precios ~</Text>

                        </View>
                    </View>

                    <View style={styles.searchContainer}>
                        <FontAwesome name="search" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar"
                            value={searchText}
                            onChangeText={handleSearch}
                        />
                    </View>
                        
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.filterButton} onPress={() => {/* Lógica del filtro */}}>
                            <FontAwesome name="filter" size={18} color="#fff" />
                            <Text style={styles.filterButtonText}>Filtrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.createButton} onPress={handleInventario}>
                            <FontAwesome name="plus" size={18} color="#fff" style={styles.plusIcon} />
                            <Text style={styles.createButtonText}>Inventario</Text>
                        </TouchableOpacity>
                    </View>


                    

                    <View style={styles.titleContainer}>
                        <Text style={{ color: "#000", fontSize: 18, fontWeight: 'bold' }}>POLOS LUCIANA</Text>
                        <View style={styles.line}></View>
                    </View>

                    {filteredContainers.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No se encontro tu seleccion.</Text>
                        </View>
                    ) : (
                        filteredContainers.map((container, index) => (
                            visibility[index] !== false && (
                                <View key={container.id} style={styles.sectionContainer}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.postTime}>
                                            {`Publicado: Hace ${Math.floor((new Date() - container.time) / 60000)} minutos`}
                                        </Text>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => openModal(index)}>
                                            <FontAwesome name="close" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.imageContainer}>
                                        <Image source={container.imageSource} style={styles.image} />
                                    </View>

                                    <View style={styles.infoContainer}>
                                        <Text style={styles.sectionTitle}>INFORMACIÓN VACANTE</Text>
                                        <Text><Text style={styles.labelBold}>Nombre autor:</Text> {container.nombre}</Text>
                                        <Text><Text style={styles.labelBold}>Título de la vacante:</Text> {container.titulo}</Text>
                                        <Text><Text style={styles.labelBold}>Categoría:</Text> {container.categoria}</Text>
                                        <Text><Text style={styles.labelBold}>Descripción:</Text> {container.descripcion}</Text>
                                        <Text><Text style={styles.labelBold}>Barrio:</Text> {container.barrio}</Text>
                                        <Text><Text style={styles.labelBold}>Valor del servicio:</Text> {container.valor}</Text>
                                        <Text><Text style={styles.labelBold}>Tiempo de duración:</Text> {container.duracion}</Text>
                                        <Text><Text style={styles.labelBold}>Experiencia mínima:</Text> {container.experiencia}</Text>
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={() => handleEditJob(container)}>
                                            <Text style={styles.buttonText}>EDITAR</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.reportButton} onPress={openReportModal}>
                                        <FontAwesome name="exclamation-triangle" size={20} color="white" />
                                    </TouchableOpacity>
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
                                <Text style={styles.modalMessage}>¿Estás seguro de eliminar la vacante?</Text>
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

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={acceptModalVisible}
                        onRequestClose={() => setAcceptModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>CONFIRMACIÓN</Text>
                                <Text style={styles.modalMessage}>¿Estás seguro que deseas editar la vacante?</Text>
                                <View style={styles.modalButtons}>
                                    <Pressable style={styles.modalButtonCancel} onPress={() => setAcceptModalVisible(false)}>
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalButtonConfirm} onPress={confirmAndAccept}>
                                        <Text style={styles.modalButtonText}>Aceptar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal de Reporte */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={reportModalVisible}
                        onRequestClose={() => setReportModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>Reporte</Text>

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
                                        <Picker.Item label="Sugerencia" value="Sugerencia" />
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
                                    placeholder="Describa la Razón del Reporte"
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
    },
    headerContainer: {
        width: "100%",
        height: 180,
        backgroundColor: "#029FF0",
        alignItems: "center",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    
    logoContainer: {
        marginTop: 40,
        alignItems: "center",
    },
    logoImage: {
        width: 60,
        height: 75,
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: '#029FF0',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 10,
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#029FF0',
    },
    searchInput: {
        height: 40,
        flex: 1,
    },
    createButton: {
        backgroundColor: '#029FF0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    plusIcon: {
        marginRight: 10,
    },
    titleContainer: {
        width: 300, alignItems: 'center', marginTop: 35,
    },
    line: {
        width: '100%', borderWidth: .5, borderColor: '#bbb',
    },
    sectionContainer: {
        borderWidth: 2,
        borderColor: "#E1EAF7", // Color del borde de la tarjeta
        backgroundColor: '#FFFFFF', // Fondo de la tarjeta
        shadowColor: '#000', // Sombra para darle profundidad
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 320, // Ancho de la tarjeta
        borderRadius: 15, // Bordes redondeados
        marginTop: 20,
        marginBottom: 10,
        padding: 20, // Espaciado interno
        alignItems: "center",
        position: "relative",
    },
    postTime: {
        color: "#888", // Color gris para el tiempo de publicación
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    image: {
        width: 180,
        height: 100,
        borderRadius: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%', // Ajustar el ancho del contenedor
        marginTop: 10,
      },
      
      filterButton: {
        backgroundColor: '#029FF0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        width: '32%', // Ajusta el ancho del botón de filtro
      },
      
      filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8, // Espacio entre el icono y el texto
      },
      
      createButton: {
        backgroundColor: '#029FF0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width: '60%', // Ajusta el ancho del botón de "Crear Vacante"
      },
      
      createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8, // Espacio entre el icono y el texto
      },
      
      closeButton: {
        position: 'absolute',
        top: -20,
        right: -65,
        backgroundColor: '#029FF0', // Azul para el botón de cierre
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 7,
        padding: 10,
        elevation: 2,
    },
    // Botón de reporte en la parte inferior izquierda
    reportButton: {
        position: 'absolute',
        bottom: 0, // Posicionado en la parte inferior
        left: 0, // Posicionado en la parte izquierda
        backgroundColor: '#029FF0',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 7,
        padding: 10,
        elevation: 2,
    },
    infoContainer: {
        alignItems: "flex-start", // Alinear la información a la izquierda para una lectura más fluida
        marginTop: 15,
        paddingHorizontal: 10
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#029FF0', // Azul para los títulos de secciones
        marginTop: 20,
        marginBottom: 10,
    },
    infoTextContainer: {
        fontWeight: 'bold',
        color: '#263850',
        fontSize: 16,
    },
    infoText: {
        marginBottom: 10,
        fontSize: 16,
    },
    labelBold: {
        fontWeight: 'bold',
        color: '#263850', // Texto oscuro
        fontSize: 16
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
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'center',
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
    noResultsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 16,
        color: '#888',
    },
});
