import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView, StyleSheet, Platform, StatusBar, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { VacanciesContext } from '../context/VacanciesContext';

export default function Historial() { // Nombre actualizado
  const { history, setHistory } = useContext(VacanciesContext); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(history);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false); 

  useEffect(() => {
    setFilteredData(history); 
  }, [history]);

  useEffect(() => {
    filterData();
  }, [selectedFilter]);

  const handleDeleteAll = () => {
    setHistory([]); 
    setShowDeleteAllModal(false); 
    setShowDeleteMessage(true); 
    setTimeout(() => {
      setShowDeleteMessage(false); 
    }, 2000);
  };

  const handleDelete = (id) => {
    const selected = history.find(item => item.id === id); 
    setSelectedItem(selected);
    setShowDeleteConfirmation(true); 
  };

  const confirmDelete = () => {
    const newData = history.filter(item => item.id !== selectedItem.id);
    setHistory(newData); 
    setFilteredData(newData); 
    setShowDeleteConfirmation(false); 
    setShowDeleteMessage(true); 
    setTimeout(() => {
      setShowDeleteMessage(false);
    }, 2000);
  };

  const filterData = () => {
    const now = new Date();
    let filtered = [];

    switch (selectedFilter) {
      case 'hoy':
        filtered = history.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === now.toDateString();
        });
        break;
      case 'esta_semana':
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() - now.getDay() + 6);
        filtered = history.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startOfWeek && itemDate <= endOfWeek;
        });
        break;
      case 'este_mes':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        filtered = history.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startOfMonth && itemDate <= endOfMonth;
        });
        break;
      case 'este_ano':
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        filtered = history.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startOfYear;
        });
        break;
      case 'todos':
        filtered = history;
        break;
      default:
        filtered = history;
        break;
    }

    setFilteredData(filtered);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = history.filter(item =>
      item.process.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredData(history);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.processContainer}>
        <Text style={styles.processTitle}>Proceso:</Text>
        <Text style={styles.itemProcess}>{item.process}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIconContainer}>
        <Ionicons name="trash-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HISTORIAL</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar en el historial"
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#808080" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={[styles.pickerContainer]}>
          <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.pickerTitleContainer}>
            <Text style={styles.pickerTitle}>Filtrar por</Text>
          </TouchableOpacity>
          {pickerVisible && (
            <Picker
              selectedValue={selectedFilter}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedFilter(itemValue);
                setPickerVisible(false);
              }}
              mode="dropdown"
            >
              <Picker.Item label="Hoy" value="hoy" />
              <Picker.Item label="Esta semana" value="esta_semana" />
              <Picker.Item label="Este mes" value="este_mes" />
              <Picker.Item label="Este año" value="este_ano" />
              <Picker.Item label="Todos" value="todos" />
            </Picker>
          )}
        </View>

        <TouchableOpacity onPress={() => setShowDeleteAllModal(true)} style={styles.deleteAllButton}>
          <Text style={styles.buttonText}>Borrar todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal de confirmación para eliminar todo */}
      <Modal
        visible={showDeleteAllModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDeleteAllModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro que deseas eliminar todo el historial?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButtonCancel}
                onPress={() => setShowDeleteAllModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonConfirm}
                onPress={handleDeleteAll}
              >
                <Text style={styles.modalButtonTextConfirm}>Eliminar todo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación para eliminar un empleo */}
      <Modal
        visible={showDeleteConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro que deseas eliminar este empleo del historial?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButtonCancel}
                onPress={() => setShowDeleteConfirmation(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonConfirm}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonTextConfirm}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Mensaje temporal de eliminación */}
      {showDeleteMessage && (
        <View style={styles.deleteMessageContainer}>
          <Text style={styles.deleteMessageText}>Eliminado del historial</Text>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  processTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#808080',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#029ff0',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 120,
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: 27 ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  pickerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerTitle: {
    color: '#52A0F1',
    fontSize: 16,
    marginRight: 5,
    marginLeft: -8,
    fontWeight: 'bold'
  },
  picker: {
    width: 150,
    color: 'black',
  },
  buttonText: {
    color: '#52A0F1',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dateContainer: {
    flex: 1,
  },
  itemDate: {
    color: '#808080',
  },
  processContainer: {
    flex: 3,
    marginLeft: 10,
  },
  itemProcess: {
    fontSize: 16,
  },
  deleteIconContainer: {
    marginLeft: 'auto',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semitransparente para el fondo
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20, // Bordes redondeados
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#029FF0',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#029ff0',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonTextCancel: {
    color: '#029ff0',
    fontWeight: 'bold',
  },
  modalButtonConfirm: {
    backgroundColor: '#029ff0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonTextConfirm: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteMessageContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  deleteMessageText: {
    color: 'white',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    height:90,
    backgroundColor: '#F7F7F7', // Fondo gris claro
    borderRadius: 10, // Bordes redondeados
    marginVertical: 8, // Margen entre los elementos
    marginHorizontal: 16, // Márgenes laterales
    elevation: 2, // Sombra para darle relieve
  },
});
