import { View, Text, Image, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header({ logoSource }) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <FontAwesome
          name="bars"
          color="#fff"
          style={styles.iconMenu}
          onPress={() => alert("Este es el menú hamburguesa.")}
        />
      </View>

      <View style={styles.logoContainer}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
          Tu Perfil
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#3bb4f3",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
  },

  iconMenu: {
    fontSize: 26,
    marginLeft: 40,
  },

  logoContainer: {
    marginLeft: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 80,
    height: 45,
    marginBottom: 4,
    marginTop: 15,
    resizeMode: "contain",
  },
});
