import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";


export default function ExibirUnidade({ navigation }) {
  const [unidadeLista, setUnidadeLista] = React.useState([]);
  const [expandedUnidade, setExpandedUnidade] = React.useState(null);

  React.useEffect(() => {
    const retrieveUnidadeList = async () => {
      try {
        const unidadeListString = await AsyncStorage.getItem("unidadeLista");
        if (unidadeListString !== null) {
          setUnidadeLista(JSON.parse(unidadeListString));
        }
      } catch (error) {
        Alert.alert("Erro ao recuperar itens salvos");
      }
    };
    retrieveUnidadeList();
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Button
        title="CRIAR UNIDADE"
        onPress={() => navigation.navigate('Criar Unidade')}
      />
      </View>
      
      <FlatList
        data={unidadeLista}
        renderItem={({ item, index }) => (
          <View style={styles.unidadeContainer}>
            <Text style={styles.unidadeTitulo}>{item.nome}</Text>
            {expandedUnidade === index ? (
              <Text style={styles.unidadeDesc}>{item.endereco}</Text>
            ) : (
              <Text style={styles.unidadeDesc}>{item.endereco.substring(0, 15)}...</Text>
            )}
            <Text style={styles.unidadeDesc}>{item.cnpj}</Text>
            <Text style={styles.unidadeDesc}>{item.text}</Text>
            
            <View style={styles.buttonContainer}>
              <View style={{ width: 10 }} />
              {expandedUnidade === index ? (
                <Icon.Button
                  name="minus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedUnidade(null)}
                >
                  <Text style={styles.buttonText}>MOSTRAR MENOS</Text>
                </Icon.Button>
              ) : (
                <Icon.Button
                  name="plus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedUnidade(index)}
                >
                  <Text style={styles.buttonText}>DETALHES</Text>
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
    backgroundColor: "#020617",
    color: 'white',
    paddingTop: 50,
  },

  unidadeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90%",
    color: 'white',
    marginVertical: 10,
    backgroundColor: '#0F172A', 
    borderWidth: 2, 
    borderColor: '#0F172A', 
    borderRadius: 18, 
    padding: 20,
    minWidth: 250,
    
  },

  unidadeDesc: {
    color: 'white',
  },

  unidadeTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Calibri",
    color: 'white',
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0891b2",
    fontSize: 15,
  },
});

