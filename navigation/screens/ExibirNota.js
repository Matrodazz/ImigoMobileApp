import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";


export default function ExibirNota({ navigation }) {
  const [notasLista, setNotasLista] = React.useState([]);
  const [expandedNoteIndex, setExpandedNoteIndex] = React.useState(null);

  React.useEffect(() => {
    const retrieveNotesList = async () => {
      try {
        const notesListString = await AsyncStorage.getItem("notasLista");
        if (notesListString !== null) {
          setNotasLista(JSON.parse(notesListString));
        }
      } catch (error) {
        Alert.alert("Erro ao recuperar notas salvas");
      }
    };
    retrieveNotesList();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/imagens/notas.jpg")}
        style={styles.imagem}
        resizeMode="contain"
      />

      <FlatList
        data={notasLista}
        renderItem={({ item, index }) => (
          <View style={styles.notaContainer}>
            <Text style={styles.noteTitulo}>{item.title}</Text>
            {expandedNoteIndex === index ? (
              <Text>{item.text}</Text>
            ) : (
              <Text>{item.text.substring(0, 15)}...</Text>
            )}
            <View style={styles.buttonContainer}>
              <View style={{ width: 10 }} />
              {expandedNoteIndex === index ? (
                <Icon.Button
                  name="minus"
                  backgroundColor="#D8BFD8"
                  onPress={() => setExpandedNoteIndex(null)}
                >
                  <Text style={styles.buttonText}>MOSTRAR MENOS</Text>
                </Icon.Button>
              ) : (
                <Icon.Button
                  name="plus"
                  backgroundColor="#D8BFD8"
                  onPress={() => setExpandedNoteIndex(index)}
                >
                  <Text style={styles.buttonText}>LEIA MAIS</Text>
                </Icon.Button>
              )}
              <View style={{ width: 10 }} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },

  imagem: {
    width: 700,
    height: 300,
  },

  notaContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
    backgroundColor: '#F2F2F2', 
    borderWidth: 2, 
    borderColor: '#F2F2F2', 
    borderRadius: 18, 
    padding: 20,
    minWidth: 160,
    
  },

  noteTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Calibri",
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 15,
  },
});

