import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Notas from './screens/Notas';
import ExibirNota from './screens/ExibirNota';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lista de Notas" component={ExibirNota} />
        <Tab.Screen name="Criar e editar Notas" component={Notas} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}
