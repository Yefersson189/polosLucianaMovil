import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeUsuario() {
    const [visibility, setVisibility] = useState([true, true, true]);
    const [searchText, setSearchText] = useState('');
    const [firstModalVisible, setFirstModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const [tipo, setTipo] = useState('');
    const [motivo, setMotivo] = useState('');
    const [comentario, setComentario] = useState('');
    const [otroTipo, setOtroTipo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);

    const [containers, setContainers] = useState([
        {
            id: 1,
            name: 'Camisa Tipo Polo',
            talla: 's,m,l,xl',
            imageSource: require('../assets/producto4.png'),
           
        },
        {
            id: 2,
            name: 'Camisa Tipo Polo',
            description: 's m l xl',
            imageSource: require('../assets/producto9.png'),
            
        },
        {
            id: 3,
            name: 'Camisa Tipo Polo',
            description: 's m l xl',
            imageSource: require('../assets/producto3.png'),
            
        },
    ]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setContainers(prevContainers => prevContainers.map(container => ({
                ...container,
                time: container.time
            })));
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const differenceInMinutes = Math.floor((now - date) / 60000);
        if (differenceInMinutes < 1) return "Visto: Hace menos de un minuto";
        if (differenceInMinutes === 1) return "Visto: Hace 1 minuto";
        return `Visto: Hace ${differenceInMinutes} minutos`;
    };

    const filteredContainers = containers.filter(container =>
        container.name.toLowerCase().includes(searchText.toLowerCase()) ||
        container.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleOpenFirstModal = (container) => {
        setSelectedVacancy(container);
        setFirstModalVisible(true);
    };

    const handleApply = () => {
        setFirstModalVisible(false);
        setSecondModalVisible(true);

        setTimeout(() => {
            setSecondModalVisible(false);
        }, 2000);
    };

    const handleSend = () => {
        if (!tipo || !motivo || (tipo === 'otro' && !otroTipo)) {
            setErrorMessage('Por favor, llena los campos "Tipo" y "Motivo", y especifica si seleccionas "Otro"');
        } else {
            setErrorMessage(''); 
            setReportModalVisible(false); 
            setTipo('');
            setMotivo('');
            setComentario('');
            setOtroTipo('');

            setThankYouVisible(true);
            setTimeout(() => {
                setThankYouVisible(false);
            }, 3000);
        }
    };

    const handleTipoChange = (value) => {
        setTipo(value);
        if (value && motivo && (value !== 'otro' || (value === 'otro' && otroTipo))) {
            setErrorMessage('');
        }
    };

    const handleMotivoChange = (value) => {
        setMotivo(value);
        if (value && tipo && (tipo !== 'otro' || (tipo === 'otro' && otroTipo))) {
            setErrorMessage('');
        }
    };

    const handleOtroTipoChange = (value) => {
        setOtroTipo(value);
        if (value && tipo === 'otro' && motivo) {
            setErrorMessage('');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Mensaje de agradecimiento siempre visible en la parte superior */}
            {thankYouVisible && (
                <View style={styles.thankYouContainer}>
                    <Text style={styles.thankYouText}>¡Gracias por su tiempo!</Text>
                </View>
            )}

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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

                    <View style={styles.titleContainer}>
                        <Text style={{ color: '#263850', fontSize: 20, marginTop: 35, marginBottom: 10, fontWeight: 'bold' }}>POLOS LUCIANA</Text>
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
                                            {getTimeAgo(container.time)}
                                        </Text>
                                    </View>

                                    <View style={styles.imageContainer}>
                                        <Image source={container.imageSource} style={styles.image} />
                                    </View>

                                    <View style={styles.infoContainer}>
                                        <Text style={styles.sectionTitle}>POLOS LUCIANA</Text>
                                        <Text><Text style={styles.labelBold}>Descripcion:</Text> {container.name}</Text>
                                        <Text><Text style={styles.labelBold}>Talla:</Text> S,M,L,XL</Text>
                                        <Text><Text style={styles.labelBold}>Valor:</Text> $ 49.900</Text>

                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={() => handleOpenFirstModal(container)}>
                                            <Text style={styles.buttonText}>COMPRAR +</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.reportButton} onPress={() => setReportModalVisible(true)}>
                                        <FontAwesome name="exclamation-triangle" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>

                            )
                        ))
                    )}

                    {/* Modal de Reporte */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={reportModalVisible}
                        onRequestClose={() => setReportModalVisible(!reportModalVisible)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>COMENTARIO</Text>

                                <Text style={styles.label}>Tipo:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={tipo}
                                        style={styles.picker}
                                        onValueChange={handleTipoChange}
                                    >
                                        <Picker.Item label="Selecciona un tipo" value="" />
                                        <Picker.Item label="Cuentanos tu Experiencia" value="Reporte" />
                                        <Picker.Item label="Otro" value="otro" />
                                    </Picker>
                                </View>

                                {tipo === 'otro' && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Especifica el tipo"
                                        placeholderTextColor="#888"
                                        value={otroTipo}
                                        onChangeText={handleOtroTipoChange}
                                    />
                                )}

                                <Text style={styles.label}>Motivo:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Descripcion"
                                    placeholderTextColor="#888"
                                    value={motivo}
                                    onChangeText={handleMotivoChange}
                                />

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
                                    <TouchableOpacity style={styles.backButton} onPress={() => setReportModalVisible(false)}>
                                        <Text style={styles.buttonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.applyButton} onPress={handleSend}>
                                        <Text style={styles.buttonText}>Enviar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Primer Modal: Pantalla de detalles de la vacante */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={firstModalVisible}
                        onRequestClose={() => setFirstModalVisible(!firstModalVisible)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {selectedVacancy && (
                                    <>
                                        <View style={styles.modalBlueBlock}>
                                            <Text style={styles.modalBlueBlockText}>POLOS LUCIANA</Text>
                                        </View>
                                        <View style={styles.modalInfoContainer}>
                                            <Text style={styles.modalInfoText}><Text style={styles.modalLabelBold}>Nombre:</Text> Camiseta Tipo Polo</Text>
                       
                                            <Text style={styles.modalInfoText}><Text style={styles.modalLabelBold}>Descripción:</Text> Elaborado con las mejores Telas y al mejor estilo que nos define la elegancia.</Text>
                                            <Text style={styles.modalInfoText}><Text style={styles.modalLabelBold}>Talla:</Text> S,M,L.XL</Text> 
                                            <Text style={styles.modalInfoText}><Text style={styles.modalLabelBold}>Valor:</Text> $49.900</Text>
    

                                        </View>

                                        <View style={styles.buttonContainerModal}>
                                            <TouchableOpacity style={styles.backButton} onPress={() => setFirstModalVisible(false)}>
                                                <Text style={styles.buttonText}>VOLVER</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                                                <Text style={styles.buttonText}>COMPRAR</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    </Modal>

                    {/* Segundo Modal: Confirmación de solicitud enviada */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={secondModalVisible}
                        onRequestClose={() => setSecondModalVisible(!secondModalVisible)}
                    >
                        <View style={styles.centeredViewSecondModal}>
                            <View style={styles.modalViewSecondModal}>
                                <Image
                                    style={styles.imageSecondModal}
                                    source={require('../assets/chuloazul.png')}
                                />
                                <Text style={styles.modalTextSecondModal}>¡TU COMPRA FUE  EXITOSA!</Text>
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
        width: 50,
        height: 65,
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
        marginBottom: 20,
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
    titleContainer: {
        width: 260, alignItems: 'center', marginTop: -10
    },
    line: {
        width: '100%', borderWidth: .5, borderColor: '#bbb'
    },
    sectionContainer: {
        borderWidth: 2,
        borderColor: "#E1EAF7", // Color del borde de la tarjeta
        backgroundColor: '#FFFFFF', // Fondo de la tarjeta
        shadowColor: '#000', // Sombra para darle profundidad
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 320, // Ajusta el ancho de la tarjeta
        borderRadius: 15, // Bordes redondeados
        marginTop: 20,
        marginBottom: 10,
        padding: 20, // Espaciado interno
        alignItems: "center",
        position: "relative",
    },
    postTime: {
        color: "#888", // Color gris para la fecha de publicación
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    image: {
        width: 100,
        height: 110,
        borderRadius: 15,
    },
    infoContainer: {
        alignItems: "flex-start", // Alinear la información a la izquierda para una mejor lectura
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
        color: '#263850', // Texto oscuro para etiquetas
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
        bottom: 0,
        left: 0,
        backgroundColor: '#029FF0',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 7,
        padding: 10,
        elevation: 2,
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
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    pickerContainer: {
        borderColor: '#029FF0',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textArea: {
        height: 80,
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
        margin: 20,
        width: '90%',
    },
    backButton: {
        backgroundColor: '#e0e0e0',
        padding: 12,
        borderRadius: 20,
        width: '45%',
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#029FF0',
        padding: 12,
        borderRadius: 20,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBlueBlock: {
        backgroundColor: '#029FF0',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 40,
        alignItems: 'center',
        width: '90%'
    },
    modalBlueBlockText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalInfoContainer: {
        paddingHorizontal: 20,
    },
    modalLabelBold: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalInfoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredViewSecondModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalViewSecondModal: {
        width: 300,
        backgroundColor: '#029FF0',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    modalTextSecondModal: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    imageSecondModal: {
        width: 100,
        height: 100,
        marginBottom: 20,
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
});
