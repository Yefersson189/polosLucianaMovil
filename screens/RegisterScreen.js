import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker

export default function RegisterScreen() {
  const navigation = useNavigation(); // Hook de navegación

  // Elimina los estados relacionados con fecha de nacimiento
  const [isEmployeeAdult, setIsEmployeeAdult] = useState(false);

  // Estados para el formulario de usuario
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [employeeConfirmPassword, setEmployeeConfirmPassword] = useState('');
  const [employeeValid, setEmployeeValid] = useState(false);
  const [employeeErrorText, setEmployeeErrorText] = useState('');

  // Estados para los campos adicionales de usuario
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeSecondName, setEmployeeSecondName] = useState('');
  const [employeeFirstLastName, setEmployeeFirstLastName] = useState('');
  const [employeeSecondLastName, setEmployeeSecondLastName] = useState('');
  const [employeeDocumentType, setEmployeeDocumentType] = useState('');
  const [employeeDocumentNumber, setEmployeeDocumentNumber] = useState('');
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');

  // Estado para controlar la visibilidad del modal de términos y condiciones
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Función para validar el correo electrónico
  const validateEmail = (text) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text);
  };

  // Función para verificar que las contraseñas coincidan
  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // Validación para empleado
  const validateEmployeeForm = (email, password, confirmPassword) => {
    const isValid =
      validateEmail(email) &&
      password.length >= 6 &&
      passwordsMatch(password, confirmPassword);

    setEmployeeValid(isValid);
    if (!isValid) {
      if (!validateEmail(email)) {
        setEmployeeErrorText('Por favor, introduce un correo electrónico válido.');
      } else if (password.length < 6) {
        setEmployeeErrorText('La contraseña debe tener al menos 6 caracteres.');
      } else if (!passwordsMatch(password, confirmPassword)) {
        setEmployeeErrorText('Las contraseñas no coinciden.');
      }
    } else {
      setEmployeeErrorText('');
    }
    return isValid;
  };

  // Manejo del registro
  const handleRegister = () => {
    if (validateEmployeeForm(employeeEmail, employeePassword, employeeConfirmPassword)) {
      navigation.navigate('HomeUsuarioScreen');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Fondo de color con la superposición */}
        <View style={styles.colorOverlay}></View>
        <View style={styles.inner}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <View style={styles.formContainer}>
            {/* Formulario de usuario/empleado */}
            <View style={styles.fieldsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Primer Nombre"
                value={employeeFirstName}
                onChangeText={setEmployeeFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Segundo Nombre"
                value={employeeSecondName}
                onChangeText={setEmployeeSecondName}
              />
              <TextInput
                style={styles.input}
                placeholder="Primer Apellido"
                value={employeeFirstLastName}
                onChangeText={setEmployeeFirstLastName}
              />
              <TextInput
                style={styles.input}
                placeholder="Segundo Apellido"
                value={employeeSecondLastName}
                onChangeText={setEmployeeSecondLastName}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={employeeDocumentType}
                  style={styles.picker}
                  onValueChange={(itemValue) => setEmployeeDocumentType(itemValue)}
                >
                  <Picker.Item label="Selecciona Tipo de Documento" value="" />
                  <Picker.Item label="Cédula de Ciudadanía" value="cc" />
                  <Picker.Item label="Cédula de Extranjería" value="ce" />
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Número de Documento"
                value={employeeDocumentNumber}
                onChangeText={setEmployeeDocumentNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Celular"
                value={employeePhoneNumber}
                onChangeText={setEmployeePhoneNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={employeeAddress}
                onChangeText={setEmployeeAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={employeeEmail}
                onChangeText={(text) => {
                  setEmployeeEmail(text.trim());
                  validateEmployeeForm(text.trim(), employeePassword, employeeConfirmPassword);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={employeePassword}
                onChangeText={(text) => {
                  setEmployeePassword(text);
                  validateEmployeeForm(employeeEmail, text, employeeConfirmPassword);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry={true}
                value={employeeConfirmPassword}
                onChangeText={(text) => {
                  setEmployeeConfirmPassword(text);
                  validateEmployeeForm(employeeEmail, employeePassword, text);
                }}
              />
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setIsEmployeeAdult(!isEmployeeAdult)}
                >
                  <Ionicons
                    name={isEmployeeAdult ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={isEmployeeAdult ? '#263850' : '#263850'}
                  />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  Confirmo que soy mayor de edad
                </Text>
              </View>

              {employeeErrorText ? <Text style={styles.errorText}>{employeeErrorText}</Text> : null}
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              style={[
                styles.button,
                !employeeValid ? styles.buttonDisabled : null,
              ]}
              disabled={!employeeValid}
            >
              <Text
                style={[
                  styles.buttonText,
                  !employeeValid ? styles.buttonTextDisabled : null,
                ]}
              >
                Regístrate
              </Text>
            </TouchableOpacity>

            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>

            <TouchableOpacity onPress={() => setShowTermsModal(true)}>
              <Text style={styles.termsText}>
                Al presionar en "Regístrate", aceptas nuestros{' '}
                <Text style={styles.boldText}>Términos de servicio</Text> y{' '}
                <Text style={styles.boldText}>Política de privacidad</Text>.
              </Text>
            </TouchableOpacity>

            <Modal
              visible={showTermsModal}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setShowTermsModal(false)}
            >
              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalTitle}>Términos de Servicio y Política de Privacidad</Text>
                  <Text style={styles.modalText}>
                    Aquí van los términos de servicio y la política de privacidad. Puedes personalizarlos a tu conveniencia.
                  </Text>
                  <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowTermsModal(false)}>
                    <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </Modal>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 20,
  },
  formContainer: {
    width: '85%',
    alignItems: 'center',
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '89%',
    backgroundColor: '#029FF0',
    zIndex: -1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#52A0F1',
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 3,
  },
  selectedRoleButton: {
    backgroundColor: '#263850',
  },
  roleButtonText: {
    color: '#263850',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedRoleButtonText: {
    color: '#52A0F1',
  },
  fieldsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#263850',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#AAAAAA',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 45,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  termsText: {
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#263850',
    padding: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#263850',

  },
});