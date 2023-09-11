import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, FlatList, StyleSheet, TextInput, Alert } from "react-native";

export default function Unidades({ navigation }) {
  const [unidadeNome, setUnidadeNome] = React.useState('');
  const [unidadeEmail, setUnidadeEmail] = React.useState('');
  const [unidadeCnpj, setUnidadeCnpj] = React.useState('');
  const [unidadeEndereco, setUnidadeEndereco] = React.useState('');
  const [unidadeLista, setUnidadeLista] = React.useState([]);
  const [editarUnidadeIndex, setEditarUnidadeIndex] = React.useState(null);
  const [expandedUnidadeIndex, setExpandedUnidadeIndex] = React.useState(null);

  React.useEffect(() => {
    const retrieveUnidadeList = async () => {
      try {
        const unidadeListString = await AsyncStorage.getItem('unidadeLista');
        if (unidadeListString !== null) {
          setUnidadeLista(JSON.parse(unidadeListString));
        }
      } catch (error) {
        Alert.alert('Erro ao trazer itens salvos');
      }
    };
    retrieveUnidadeList();
  }, []);

  const handleAddButtonPress = async () => {
    try {
      const novaUnidade = { nome: unidadeNome, text: unidadeEmail, cnpj: unidadeCnpj, endereco: unidadeEndereco };
      const updatedunidadeLista = [...unidadeLista, novaUnidade];
      setUnidadeLista(updatedunidadeLista);
      await AsyncStorage.setItem('unidadeLista', JSON.stringify(updatedunidadeLista));
      Alert.alert('Unidade salva com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao salvar unidade');
    }
  };

  const handleEditButtonPress = (index) => {
    setEditarUnidadeIndex(index);
    setUnidadeNome(unidadeLista[index].nome);
    setUnidadeEmail(unidadeLista[index].text);
  };

  const handleSaveButtonPress = async () => {
    try {
      const updatedunidadeLista = [...unidadeLista];
      updatedunidadeLista[editarUnidadeIndex] = { nome: unidadeNome, text: unidadeEmail, cnpj: unidadeCnpj, endereco: unidadeEndereco };
      setUnidadeLista(updatedunidadeLista);
      await AsyncStorage.setItem('unidadeLista', JSON.stringify(updatedunidadeLista));
      setEditarUnidadeIndex(null);
      Alert.alert('Unidade atualizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao atualizar unidade');
    }
  };

  const handleDeleteButtonPress = async (index) => {
    try {
      const updatedunidadeLista = [...unidadeLista];
      updatedunidadeLista.splice(index, 1);
      setUnidadeLista(updatedunidadeLista);
      await AsyncStorage.setItem('unidadeLista', JSON.stringify(updatedunidadeLista));
      Alert.alert('Unidade excluída com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir unidade');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={text => setUnidadeNome(text)}
        value={unidadeNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUnidadeCnpj(text)}
        value={unidadeCnpj}
        placeholder="CNPJ"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUnidadeEndereco(text)}
        value={unidadeEndereco}
        placeholder="Endereco"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUnidadeEmail(text)}
        value={unidadeEmail}
        placeholder="Email"
      />
      

      <View>
        {editarUnidadeIndex === null ? (
          <Icon.Button
            name="plus"
            backgroundColor="#0891b2"
            onPress={handleAddButtonPress}
          >
            <Text style={styles.buttonText}>CADASTRAR UNIDADE</Text>
          </Icon.Button>
        ) : (
          <Icon.Button
            name="save"
            backgroundColor="#0891b2"
            onPress={handleSaveButtonPress}
          >
            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
          </Icon.Button>
        )}
      </View>
      <FlatList
        data={unidadeLista}
        renderItem={({ item, index }) => (
          <View style={styles.unidadeContainer}>
            <Text style={styles.unidadeNome}>{item.nome}</Text>
            {expandedUnidadeIndex === index ? (
              <Text style={styles.unidadeDesc}>{item.endereco}</Text>
            ) : (
              <Text style={styles.unidadeDesc} >{item.endereco.substring(0, 15)}...</Text>
            )}
            <Text style={styles.unidadeDesc}>{item.cnpj}</Text>
            <Text style={styles.unidadeDesc}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <Icon.Button
                name="edit"
                backgroundColor="#0891b2"
                onPress={() => handleEditButtonPress(index)}unidadeListString
              >
                <Text style={styles.buttonText}>EDITAR</Text>
              </Icon.Button>
              <Icon.Button
                name="trash"
                backgroundColor="#0891b2"
                onPress={() => handleDeleteButtonPress(index)}
              >
                <Text style={styles.buttonText}>CANCELAR</Text>
              </Icon.Button>
              {expandedUnidadeIndex === index ? (
                <Icon.Button
                  name="minus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedUnidadeIndex(null)}
                >
                  <Text style={styles.buttonText}>MOSTRAR MENOS</Text>
                </Icon.Button>
              ) : (
                <Icon.Button
                  name="plus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedUnidadeIndex(index)}
                >
                  <Text style={styles.buttonText}>DETALHES</Text>
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
    backgroundColor: "#020617",
    paddingTop: 50,

  },

  input: {
    height: 40,
    color: 'white',
    borderColor: 'gray',
    backgroundColor: "#0F172A",
    borderWidth: 0,
    borderRadius: 18,
    padding: 10,
    width: '70%',
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Calibri",
    fontSize: 15,
  },

  unidadeDesc: {
    color: 'white',
  },

  unidadeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
    backgroundColor: '#0F172A', 
    color: 'white',
    borderWidth: 2, 
    borderColor: '#0F172A', 
    borderRadius: 18, 
    padding: 20,
    minWidth: 250,
    
  },

  unidadeNome: {
    fontSize: 20,
    color: "white",
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
