import { StyleSheet, View, TextInput, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Buscador({ buscador }) {
  if (buscador === "true") {
    return (
      <View style={styles.container}>
        <View style={styles.buscadorContainer}>
          <FontAwesome
            name="search"
            color="#3bb4f3"
            style={styles.iconSearch}
            onPress={() => alert("Buscando producto...")}
          />
          <TextInput placeholder="Buscar..." style={styles.buscador}></TextInput>
          
        </View>

        <View>
          <FontAwesome
            name="filter"
            color="#3bb4f3"
            style={styles.iconFilter}
            onPress={() => alert("Este es el filtro.")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  buscadorContainer: {
    width: 250,
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#bbb",
    flexDirection: "row",
  },

  buscador: {
    padding: 5,
  },

  iconSearch: {
    fontSize: 20,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 5,
  },

  iconFilter: {
    fontSize: 30,
    marginTop: 40,
    marginLeft: 30,
  },
});
