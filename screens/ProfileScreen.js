import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Jazmín Muñoz');
  const [email, setEmail] = useState('JazMuñoz123@gmail.com');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('123456');
  const [passwordError, setPasswordError] = useState('');
  const [cedula, setCedula] = useState('1234567890');
  const [cedulaError, setCedulaError] = useState('');
  const [telefono, setTelefono] = useState('3141234567');
  const [telefonoError, setTelefonoError] = useState('');

  const navigation = useNavigation();

  const handleImagePress = () => {
    setIsFullScreen(true);
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

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
      console.error('Error picking image: ', error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (isFullScreen) {
        setIsFullScreen(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isFullScreen]);

  const handleChangeUsername = (text) => {
    const regex = /^[a-zA-Z\u00C0-\u017F\s]*$/;
    if (!regex.test(text)) {
      setUsernameError('El nombre de usuario debe contener solo letras y espacios.');
    } else if (text.length < 3) {
      setUsernameError('El nombre de usuario debe tener al menos 3 caracteres.');
    } else {
      setUsernameError('');
    }
    setUsername(text);
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('El correo electrónico no es válido.');
    } else {
      setEmailError('');
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      if (!usernameError && !emailError && !passwordError && !cedulaError && !telefonoError) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    validatePassword(text);
  };

  const validatePassword = (text) => {
    if (text.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleChangeCedula = (text) => {
    const cedulaRegex = /^\d{7,10}$/;
    if (!cedulaRegex.test(text)) {
      setCedulaError('La cédula debe tener entre 7 y 10 números.');
    } else {
      setCedulaError('');
    }
    setCedula(text);
  };

  const handleChangeTelefono = (text) => {
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(text)) {
      setTelefonoError('El teléfono debe tener exactamente 10 números.');
    } else {
      setTelefonoError('');
    }
    setTelefono(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back"
            size={30}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>PERFIL</Text>

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingScreen')}>
          <Ionicons 
            name="settings-outline"
            size={30}
            color="white"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TouchableOpacity style={styles.profileButton} onPress={handleImagePress}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/person.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.containerText}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.text}>EDITAR FOTO DE PERFIL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={[styles.boldText, { flex: 1 }]}>Nombre de usuario:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.inputField, { flex: 2, }]}
              value={username}
              onChangeText={handleChangeUsername}
            />
          ) : (
            <Text>{username}</Text>
          )}
        </View>
        {isEditing && usernameError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{usernameError}</Text>
          </View>
        ) : null}
        <View style={styles.content}>
          <Text style={[styles.boldText, { flex: 1 }]}>Correo:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.inputField, { flex: 2 }]}
              value={email}
              onChangeText={handleChangeEmail}
            />
          ) : (
            <Text style={styles.marginTopText}>{email}</Text>
          )}
        </View>
        {isEditing && emailError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
        ) : null}
        <View style={styles.content}>
          <Text style={styles.boldText}>Contraseña:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.inputField, { flex: 2 }]}
              value={password}
              onChangeText={handleChangePassword}
              secureTextEntry={false}
            />
          ) : (
            <Text>{password}</Text>
          )}
        </View>
        {isEditing && passwordError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{passwordError}</Text>
          </View>
        ) : null}
        <View style={styles.content}>
          <Text style={styles.boldText}>Cédula:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.inputField, { flex: 2 }]}
              value={cedula}
              onChangeText={handleChangeCedula}
              keyboardType="numeric"
            />
          ) : (
            <Text>{cedula}</Text>
          )}
        </View>
        {isEditing && cedulaError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{cedulaError}</Text>
          </View>
        ) : null}
        <View style={styles.content}>
          <Text style={styles.boldText}>Teléfono:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.inputField, { flex: 2 }]}
              value={telefono}
              onChangeText={handleChangeTelefono}
              keyboardType="numeric"
            />
          ) : (
            <Text>{telefono}</Text>
          )}
        </View>
        {isEditing && telefonoError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{telefonoError}</Text>
          </View>
        ) : null}

        <TouchableOpacity onPress={toggleEditing} style={styles.editButton}>
          <Text style={styles.textEdit}>{isEditing ? 'Guardar Cambios' : 'EDITAR O AÑADIR INFORMACIÓN'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={isFullScreen} transparent={true}>
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity style={styles.fullScreenCloseButton} onPress={handleExitFullScreen}>
            <Ionicons name="close" size={40} marginLeft={350} color="white" />
          </TouchableOpacity>
          <Image source={profileImage ? { uri: profileImage } : require('../assets/person.jpg')} style={styles.fullScreenImage} />
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  experienceContainer: {
    padding: 10,
    marginTop: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: '70%',
    height: 20,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#52A0F1',
    marginLeft: 10,
  },
  separator: {
    height: 1,            // Altura de la línea
    backgroundColor: '#ccc', // Color de la línea
    marginTop: 10,        // Espacio superior de la línea
    marginBottom: 20,     // Espacio inferior de la línea
    width: '100%',        // Ocupar todo el ancho disponible
  },
  header: {
    height: 120,
    backgroundColor: '#029FF0',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginTop: 20,
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    
  },
  profileImage: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginLeft: -10,
    borderRadius: 90,
  },
  containerText: {
    alignItems: 'center'
  },

  text: {
    color: '#029FF0',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginVertical: 40,
  },
  textEdit: {
    color: '#029FF0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 10,
    top: -15,
  },
  text1: {
    color: '#029FF0',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 90,
  },
  boldText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 16
  },
  marginTopText: {
    marginTop: 10,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'right',
  },
  fullScreenCloseButton: {
    marginRight: 20,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: '',
    marginVertical: 0,
  },
  fullScreenText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    flex: 2,
  },
  errorContainer: {
    marginLeft: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#52A0F1',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default ProfileScreen;
