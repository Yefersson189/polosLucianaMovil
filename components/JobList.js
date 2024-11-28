import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase";
import JobCard from "./JobCard";

export default function JobList({ navigation }) {
  const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = db.collection("jobs").onSnapshot((snapshot) => {
  //     const jobsData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setJobs(jobsData);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    // <FlatList
    //   data={jobs}
    //   renderItem={({ item }) => (
    //     <JobCard
    //       job={item}
    //       onPress={() => navigation.navigate("JobDetails", { jobId: item.id })}
    //     />
    //   )}
    //   keyExtractor={(item) => item.id}
    //   contentContainerStyle={styles.list}
    // />
    <View>
      <Text>Lista de Empleos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
