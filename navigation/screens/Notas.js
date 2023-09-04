import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Notas({ navigation }) {
  const [notaTexto, setNotaTexto] = React.useState('');
  const [notaTitulo, setNotaTitulo] = React.useState('');
  const [notasLista, setNotasLista] = React.useState([]);
  const [editarNotaIndex, setEditarNotaIndex] = React.useState(null);
  const [expandedNoteIndex, setExpandedNoteIndex] = React.useState(null);

  React.useEffect(() => {
    const retrieveNotesList = async () => {
      try {
        const notesListString = await AsyncStorage.getItem('notasLista');
        if (notesListString !== null) {
          setNotasLista(JSON.parse(notesListString));
        }
      } catch (error) {
        Alert.alert('Erro ao recuperar notas salvas');
      }
    };
    retrieveNotesList();
  }, []);

  const handleAddButtonPress = async () => {
    try {
      const novaNota = { title: notaTitulo, text: notaTexto };
      const updatedNotasLista = [...notasLista, novaNota];
      setNotasLista(updatedNotasLista);
      await AsyncStorage.setItem('notasLista', JSON.stringify(updatedNotasLista));
      Alert.alert('Nota salva com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao salvar nota');
    }
  };

  const handleEditButtonPress = (index) => {
    setEditarNotaIndex(index);
    setNotaTitulo(notasLista[index].title);
    setNotaTexto(notasLista[index].text);
  };

  const handleSaveButtonPress = async () => {
    try {
      const updatedNotasLista = [...notasLista];
      updatedNotasLista[editarNotaIndex] = { title: notaTitulo, text: notaTexto };
      setNotasLista(updatedNotasLista);
      await AsyncStorage.setItem('notasLista', JSON.stringify(updatedNotasLista));
      setEditarNotaIndex(null);
      Alert.alert('Nota atualizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao atualizar nota');
    }
  };

  const handleDeleteButtonPress = async (index) => {
    try {
      const updatedNotasLista = [...notasLista];
      updatedNotasLista.splice(index, 1);
      setNotasLista(updatedNotasLista);
      await AsyncStorage.setItem('notasLista', JSON.stringify(updatedNotasLista));
      Alert.alert('Nota excluída com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir nota');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={text => setNotaTitulo(text)}
        value={notaTitulo}
        placeholder="Digite o título da nota aqui"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        onChangeText={text => setNotaTexto(text)}
        value={notaTexto}
        placeholder="Digite o conteúdo da sua nota aqui"
        multiline={true}
      />
      <View>
        {editarNotaIndex === null ? (
          <Icon.Button
            name="plus"
            backgroundColor="#D8BFD8"
            onPress={handleAddButtonPress}
          >
            <Text style={styles.buttonText}>ADICIONE UMA NOTA</Text>
          </Icon.Button>
        ) : (
          <Icon.Button
            name="save"
            backgroundColor="#D8BFD8"
            onPress={handleSaveButtonPress}
          >
            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
          </Icon.Button>
        )}
      </View>
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
              <Icon.Button
                name="edit"
                backgroundColor="#D8BFD8"
                onPress={() => handleEditButtonPress(index)}
              >
                <Text style={styles.buttonText}>EDITAR</Text>
              </Icon.Button>
              <Icon.Button
                name="trash"
                backgroundColor="#D8BFD8"
                onPress={() => handleDeleteButtonPress(index)}
              >
                <Text style={styles.buttonText}>EXCLUIR</Text>
              </Icon.Button>
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

  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: "#F2F2F2",
    borderWidth: 2,
    borderRadius: 18,
    padding: 10,
    width: '70%',
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Calibri",
    fontSize: 15,
  },

  textArea: {
    height: 120,
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
    justifyContent: "space-between",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 15,
    
    
  },
});
