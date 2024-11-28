import React, { component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Section({ photoSource }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.containerFecha}>
            <TouchableOpacity style={styles.fecha}>
              <MaterialCommunityIcons
                name="view-list"
                color={"#3bb4f3"}
                size={30}
              />
              <Text style={{ color: "#3bb4f3" }}>Por Fecha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fecha}>
              <Text style={{ color: "#3bb4f3" }}>Borrar Todo</Text>
              <MaterialCommunityIcons
                name="trash-can-outline"
                color={"#3bb4f3"}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lineStyle1} />

          <View style={styles.containerList1}>
            <Text>Fecha</Text>
            <Text>Descripción</Text>
            <Text>Acciones</Text>
          </View>

          <View style={styles.lineStyle1} />

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
            <View style={[styles.box, styles.box3]}>
              <View style={styles.icon}>
                <TouchableOpacity style={styles.iconList}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color={"red"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.icon}>
                <TouchableOpacity style={styles.iconList}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color={"red"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.icon}>
                <TouchableOpacity style={styles.iconList}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color={"red"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.icon}>
                <TouchableOpacity style={styles.iconList}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color={"red"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.lineStyle} />
              <View style={styles.icon}>
                <TouchableOpacity style={styles.iconList}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color={"red"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
             
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#3bb4f3",
    width: 330,
    height: 500,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 10,
    alignItems: "center",
  },
  containerFecha: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 10,
    // backgroundColor:"black"
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
  containerList1: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  containerList: {
    flexDirection: "row",
    width: 340,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  box: {
    width: "33%",
    height: 230,
  },
  textList: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
    height: 40,
  },
  textList1: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
    height: 40,
  },
  iconList: {
    marginTop: 10,
    marginBottom: 10,
    color: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  // box1: {
  //   backgroundColor: "#2196F3",
  // },
  // box2: {
  //   backgroundColor: "#8BC34A",
  // },
  // box3: {
  //   flexDirection: "row",
  // },
  fecha: {
    flexDirection: "row",
    with: "50%",
    alignItems: "center",
  },
  listDescription: {
    flexDirection: "row",
    with: 50,
    alignItems: "center",
  },
});
