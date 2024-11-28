import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { db } from "../firebase";

export default function JobDetailsScreen() {
  // const { jobId } = route.params;
  const [job, set] = useState(null);
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("jobs")
  //     .doc(Id)
  //     .onSnapshot((doc) => {
  //       set();
  //     });
  // });
  //return () => unsubscribe();
  return (
    <View style={styles.container}>
      <Text> Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
