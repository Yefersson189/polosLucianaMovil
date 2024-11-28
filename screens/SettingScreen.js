import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity, Alert, Modal, Image, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { VacanciesContext } from '../context/VacanciesContext'; // Importa el contexto

const Settings = () => {
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const [areNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isAccountLossModalVisible, setAccountLossModalVisible] = useState(false);

  const navigation = useNavigation(); // Usa el hook de navegación
  const { isEmployee, toggleRole } = useContext(VacanciesContext); // Usa el contexto para manejar el rol

  // Navegar dependiendo del rol
  const handleRoleSwitch = () => {
    toggleRole(); // Cambia el rol usando el contexto

    // Espera un pequeño delay para asegurarse de que el rol se haya actualizado
    setTimeout(() => {
      // Navega a la pantalla correcta según el nuevo rol
      if (isEmployee) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeUsuarioScreen' }], // Navega al home del Usuario
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }], // Navega al home del Administrador
        });
      }
    }, 100); // Delay de 100ms para esperar el cambio de rol
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(false);
    setAccountLossModalVisible(true);
  };

  const handleAccountLossConfirmation = () => {
    setAccountLossModalVisible(false);
    BackHandler.exitApp(); // Cierra la aplicación
  };

  return (
    <SafeAreaView style={[styles.container, isDarkModeEnabled ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.header, isDarkModeEnabled ? styles.darkHeader : styles.lightHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back"
            size={30} // Tamaño más grande de la flecha
            color="white"
            style={{ marginLeft: 10, marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>CONFIGURACIÓN</Text>
        </View>
      </View>

      {/* Opción para cambiar de rol */}
      <View style={[styles.optionContainer, isDarkModeEnabled ? styles.darkOptionContainer : styles.lightOptionContainer]}>
        <Ionicons name="people" size={24} color={isDarkModeEnabled ? 'white' : 'gray'} />
        <Text style={[styles.optionText, { color: isDarkModeEnabled ? 'white' : 'black' }]}>
          {isEmployee ? 'Cambiar a Administrador' : 'Cambiar a Usuario'}
        </Text>
        <TouchableOpacity onPress={handleRoleSwitch}>
          <Ionicons name="swap-horizontal" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Opción para activar modo nocturno */}
      <View style={[styles.optionContainer, isDarkModeEnabled ? styles.darkOptionContainer : styles.lightOptionContainer]}>
        <Ionicons name="moon" size={24} color={isDarkModeEnabled ? 'white' : 'gray'} />
        <Text style={[styles.optionText, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Activar modo nocturno</Text>
        <Switch value={isDarkModeEnabled} onValueChange={(value) => setDarkModeEnabled(value)} />
      </View>

      {/* Opción para activar notificaciones */}
      <View style={[styles.optionContainer, isDarkModeEnabled ? styles.darkOptionContainer : styles.lightOptionContainer]}>
        <Ionicons name="notifications" size={24} color={isDarkModeEnabled ? 'white' : 'gray'} />
        <Text style={[styles.optionText, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Activar notificaciones</Text>
        <Switch
          value={areNotificationsEnabled}
          onValueChange={(value) => { 
            setNotificationsEnabled(value);
            if (value) {
              Alert.alert('Notificaciones activas');
            }
          }}
        />
      </View>

      {/* Opción para eliminar cuenta */}
      <View style={[styles.optionContainer, isDarkModeEnabled ? styles.darkOptionContainer : styles.lightOptionContainer]}>
        <Ionicons name="warning" size={24} color={isDarkModeEnabled ? 'white' : 'gray'} />
        <Text style={[styles.optionText, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Eliminar cuenta</Text>
        <TouchableOpacity onPress={() => setDeleteAccountModalVisible(true)}>
          <Ionicons name="trash" size={24} style={{marginRight: 12}} color="red" />
        </TouchableOpacity>
      </View>

      {/* Modal de confirmación para eliminar cuenta */}
      <Modal transparent={true} visible={isDeleteAccountModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}> 
            <View style={styles.cloudIconContainer}>
              <Image source={require('../assets/sadcloud.png')} style={{ width: 60, height: 60 }} />
            </View>
            <Text style={styles.modalText}>¿ESTÁS SEGURO QUE DESEAS ELIMINAR TU CUENTA?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setDeleteAccountModalVisible(false)}>
                <Text style={styles.modalButtonTextCancel}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleDeleteAccount}>
                <Text style={styles.modalButtonText}>SEGURO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para la pérdida de datos de la cuenta */}
      <Modal transparent={true} visible={isAccountLossModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Eliminar tu cuenta implicará la pérdida de los siguientes datos:</Text>
            <Text style={styles.modalText}>- Trabajos guardados</Text>
            <Text style={styles.modalText}>- Ofertas de trabajo</Text>
            <Text style={styles.modalText}>- Historial de aplicaciones</Text>
            <Text style={styles.modalText}>- Beneficios acumulados</Text>
            <Text style={styles.modalText}>- Y más...</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setAccountLossModalVisible(false)}>
                <Text style={styles.modalButtonTextCancel}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleAccountLossConfirmation}>
                <Text style={styles.modalButtonText}>ELIMINAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 120,
  },
  lightHeader: {
    backgroundColor: '#00aaff',
  },
  darkHeader: {
    backgroundColor: '#005f7f',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 30,
    marginTop: 10
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
    height: 60,
  },
  lightOptionContainer: {
    borderColor: 'gray',
  },
  darkOptionContainer: {
    borderColor: 'white',
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#00aaff',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#ffffff',
  },
  modalButtonConfirm: {
    backgroundColor: '#029ff0',
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  modalButtonTextCancel: {
    fontSize: 16,
    color: '#029ff0',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalButtonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cloudIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
