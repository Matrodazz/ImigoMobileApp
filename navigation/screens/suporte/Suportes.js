import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, FlatList, StyleSheet, TextInput, Alert } from "react-native";

export default function Suportes({ navigation }) {
  const [suporteTitulo, setSuporteTitulo] = React.useState('');
  const [suporteDescricao, setSuporteDescricao] = React.useState('');
  const [suporteFabricante, setSuporteFabricante] = React.useState('');
  const [suporteModelo, setSuporteModelo] = React.useState('');
  const [suporteLista, setSuporteLista] = React.useState([]);
  const [editarSuporteIndex, setEditarSuporteIndex] = React.useState(null);
  const [expandedSuporteIndex, setExpandedSuporteIndex] = React.useState(null);

  React.useEffect(() => {
    const retrieveSuporteList = async () => {
      try {
        const suporteListString = await AsyncStorage.getItem('suporteLista');
        if (suporteListString !== null) {
          setSuporteLista(JSON.parse(suporteListString));
        }
      } catch (error) {
        Alert.alert('Erro ao trazer itens salvos');
      }
    };
    retrieveSuporteList();
  }, []);

  const handleAddButtonPress = async () => {
    try {
      const novoSuporte = { title: suporteTitulo, text: suporteDescricao, fabricante: suporteFabricante, modelo: suporteModelo };
      const updatedsuporteLista = [...suporteLista, novoSuporte];
      setSuporteLista(updatedsuporteLista);
      await AsyncStorage.setItem('suporteLista', JSON.stringify(updatedsuporteLista));
      Alert.alert('Suporte salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao salvar suporte');
    }
  };

  const handleEditButtonPress = (index) => {
    setEditarSuporteIndex(index);
    setSuporteTitulo(suporteLista[index].title);
    setSuporteDescricao(suporteLista[index].text);
  };

  const handleSaveButtonPress = async () => {
    try {
      const updatedsuporteLista = [...suporteLista];
      updatedsuporteLista[editarSuporteIndex] = { title: suporteTitulo, text: suporteDescricao, fabricante: suporteFabricante, modelo: suporteModelo  };
      setSuporteLista(updatedsuporteLista);
      await AsyncStorage.setItem('suporteLista', JSON.stringify(updatedsuporteLista));
      setEditarSuporteIndex(null);
      Alert.alert('Suporte atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao atualizar suporte');
    }
  };

  const handleDeleteButtonPress = async (index) => {
    try {
      const updatedsuporteLista = [...suporteLista];
      updatedsuporteLista.splice(index, 1);
      setSuporteLista(updatedsuporteLista);
      await AsyncStorage.setItem('suporteLista', JSON.stringify(updatedsuporteLista));
      Alert.alert('Suporte excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir suporte');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={text => setSuporteTitulo(text)}
        value={suporteTitulo}
        placeholder="Titulo do problema"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setSuporteFabricante(text)}
        value={suporteFabricante}
        placeholder="Fabricante"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setSuporteModelo(text)}
        value={suporteModelo}
        placeholder="Modelo"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        onChangeText={text => setSuporteDescricao(text)}
        value={suporteDescricao}
        placeholder="Descreva melhor o problema"
        multiline={true}
      />
      

      <View>
        {editarSuporteIndex === null ? (
          <Icon.Button
            name="plus"
            backgroundColor="#0891b2"
            onPress={handleAddButtonPress}
          >
            <Text style={styles.buttonText}>ENVIAR PEDIDO</Text>
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
        data={suporteLista}
        renderItem={({ item, index }) => (
          <View style={styles.suporteContainer}>
            <Text style={styles.suporteTitulo}>{item.title}</Text>
            {expandedSuporteIndex === index ? (
              <Text style={styles.suporteDesc}>{item.text}</Text>
            ) : (
              <Text style={styles.suporteDesc} >{item.text.substring(0, 15)}...</Text>
            )}
            <Text style={styles.suporteDesc}>{item.fabricante}</Text>
            <Text style={styles.suporteDesc}>{item.modelo}</Text>
            <View style={styles.buttonContainer}>
              <Icon.Button
                name="edit"
                backgroundColor="#0891b2"
                onPress={() => handleEditButtonPress(index)}suporteListString
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
              {expandedSuporteIndex === index ? (
                <Icon.Button
                  name="minus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedSuporteIndex(null)}
                >
                  <Text style={styles.buttonText}>MOSTRAR MENOS</Text>
                </Icon.Button>
              ) : (
                <Icon.Button
                  name="plus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedSuporteIndex(index)}
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

  suporteDesc: {
    color: 'white',
  },


  textArea: {
    height: 120,
    color: 'white',
  },

  suporteContainer: {
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

  suporteTitulo: {
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
