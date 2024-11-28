import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const validateEmail = (text) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text.trim());
    if (!validateEmail(text)) {
      setErrorText('Por favor, introduce un correo electrónico válido.');
    } else if (password.length < 6) {
      setErrorText('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setErrorText('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 6) {
      setErrorText('La contraseña debe tener al menos 6 caracteres.');
    } else if (!validateEmail(email)) {
      setErrorText('Por favor, introduce un correo electrónico válido.');
    } else {
      setErrorText('');
    }
  };

  const handleLogin = () => {
    if (validateEmail(email) && password.length >= 6) {
      navigation.navigate('MainApp');
    } else {
      setErrorText('Credenciales incorrectas. Verifica tu email o contraseña.');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };


  const handleOpenTermsModal = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inner}>
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
          />
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
              />
            </View>
            {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
            <TouchableOpacity
              style={[styles.button, !validateEmail(email) || password.length < 6 ? styles.buttonDisabled : null]}
              onPress={handleLogin}
              disabled={!validateEmail(email) || password.length < 6}
            >
              <Text style={[styles.buttonText, (!validateEmail(email) || password.length < 6) ? styles.buttonTextDisabled : null]}>
                INICIAR SESIÓN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerButton} // Nuevo estilo
              onPress={handleNavigateToRegister}
            >
              <Text style={styles.registerText}>Registrarse</Text>
            </TouchableOpacity>
            
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>             
              <Text style={{ color: "#000", fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 3, marginTop: 12 }}>~ Nos Define La Elegancia</Text>
              <Text style={{ color: "#000", fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 1 }}> Y Los Buenos Precios ~</Text>
              <View style={styles.line}></View>   
            </View>

            <TouchableOpacity onPress={handleOpenTermsModal}>
              <Text style={styles.termsText}>
                Al hacer clic en Continuar, acepta nuestros
                <Text style={styles.boldText}> Términos de servicio </Text>
                y
                <Text style={styles.boldText}> Política de privacidad</Text>.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blueBox}></View>
        </View>
      </ScrollView>

      {/* Modal for terms and conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTermsModal}
        onRequestClose={handleCloseTermsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalText}>
                Aquí puedes poner el texto completo de los términos y condiciones...
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseTermsModal}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 40,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -24,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#263850',
    padding: 12,
    borderRadius: 10,
    marginTop: 18,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#52A0F1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#AAAAAA',
  },
  registerButton: {
    backgroundColor: '#52A0F1', // Cambia el fondo a un azul claro
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center', // Centra el texto
    elevation: 2, // Añade una sombra para hacerlo más atractivo
  },
  registerText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold', // Hacer el texto más grueso
    textTransform: 'uppercase', // Convertir a mayúsculas
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 80,
    marginBottom: 5,
  },
  line: {
    borderWidth: .5,
    width: 230,
    borderColor: '#bbb',
    marginTop: 20
  },
  orText: {
    marginHorizontal: 10,
    color: '#029FF0',
    marginTop: 50,
    fontWeight: 'bold'
  },
  termsText: {
    textAlign: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  boldText: {
    color: 'black',
    fontWeight: 'bold',
  },
  blueBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '64%',
    backgroundColor: '#029FF0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    marginTop: '-150%'
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
});