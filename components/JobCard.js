import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.description}</Text>
      <Text>{job.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
