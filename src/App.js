import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  function loadRepositories(){
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }
  useEffect(() => {
    loadRepositories()
  }, [repositories]);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repositorie => repositorie.id}
          renderItem={({item: repositorie}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repositorie.title}</Text>

              <View style={styles.techsContainer}>
                {repositorie.techs.match(/([\w\*]+)/g).map(item => (
                <Text key={item} style={styles.tech}>
                  {item}
                </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repositorie.id}`}
                >
                  {repositorie.likes} curtidas
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(1)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-1`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repositorie.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repositorie.id}`}
                >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
