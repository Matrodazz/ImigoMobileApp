import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";


export default function ExibirSuporte({ navigation }) {
  const [suporteLista, setSuporteLista] = React.useState([]);
  const [expandedSuporte, setExpandedSuporte] = React.useState(null);

  React.useEffect(() => {
    const retrieveSuporteList = async () => {
      try {
        const suporteListString = await AsyncStorage.getItem("suporteLista");
        if (suporteListString !== null) {
          setSuporteLista(JSON.parse(suporteListString));
        }
      } catch (error) {
        Alert.alert("Erro ao recuperar itens salvos");
      }
    };
    retrieveSuporteList();
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Button
        title="CRIAR SUPORTE"
        onPress={() => navigation.navigate('Criar Suporte')}
      />
      </View>
      
      <FlatList
        data={suporteLista}
        renderItem={({ item, index }) => (
          <View style={styles.suporteContainer}>
            <Text style={styles.suporteTitulo}>{item.title}</Text>
            {expandedSuporte === index ? (
              <Text style={styles.suporteDesc}>{item.text}</Text>
            ) : (
              <Text style={styles.suporteDesc}>{item.text.substring(0, 15)}...</Text>
            )}
            <Text style={styles.suporteDesc}>{item.fabricante}</Text>
            <Text style={styles.suporteDesc}>{item.modelo}</Text>
            <View style={styles.buttonContainer}>
              <View style={{ width: 10 }} />
              {expandedSuporte === index ? (
                <Icon.Button
                  name="minus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedSuporte(null)}
                >
                  <Text style={styles.buttonText}>MOSTRAR MENOS</Text>
                </Icon.Button>
              ) : (
                <Icon.Button
                  name="plus"
                  backgroundColor="#0891b2"
                  onPress={() => setExpandedSuporte(index)}
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

  suporteContainer: {
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

  suporteDesc: {
    color: 'white',
  },

  suporteTitulo: {
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

