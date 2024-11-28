import { View, Text, StyleSheet } from "react-native";

export default function Title({}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#263850",
          fontSize: 20,
          marginTop: 35,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        MIS VACANTES
      </Text>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    alignItems: "center",
  },

  line: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#bbb",
  },
});
