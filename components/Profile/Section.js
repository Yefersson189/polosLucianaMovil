import React, { component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function Section({ photoSource }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={photoSource} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 10,
              color: "#3bb4f3",
            }}
          >
            Editar Foto de Perfil
          </Text>
        </TouchableOpacity>
        <View style={styles.lineStyle1} />

        <View>
          <View style={styles.containerList}>
            <View style={[styles.box, styles.box1]}>
              <Text style={styles.textList}>Nombre de Usuario</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList}>Correo Electrónico</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList}>Fecha de Nacimento</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList}>Doc. de Identidad</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList}>Número de Celular</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
              <Text style={styles.textList1}>Laura Camila</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList1}>laucamila@gmail.com</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList1}>20/05/90</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList1}>123456789</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.textList1}>315-444-03-06</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 10,
              color: "#3bb4f3",
            }}
          >
            Añadir o Editar Información
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#3bb4f3",
    width: 330,
    height: 500,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 50,
    alignItems: "center",
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },

  infoContainer: {
    alignItems: "center",
  },

  buttonContainer: {
    width: "50%",
    height: 40,
    justifyContent: "center",
    backgroundColor: "#3bb4f3",
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  button: {
    fontSize: 16,
    alignItems: "center",
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: "gray",
    width: 150,
  },
  lineStyle1: {
    borderWidth: 0.3,
    borderColor: "gray",
    width: 300,
    marginBottom: 20,
  },
  containerList: {
    flexDirection: "row",
  },
  box: {
    width: 160,
    height: 230,
  },
  textList: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
  },
  textList1: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
  },
  //   box1: {
  //     backgroundColor: "#2196F3",
  //   },
  //   box2: {
  //     backgroundColor: "#8BC34A",
  //   },
});
