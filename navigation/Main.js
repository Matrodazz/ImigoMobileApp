import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExibirSuporte from './screens/suporte/ExibirSuporte';
import Suportes from './screens/suporte/Suportes';
import ExibirUnidades from './screens/unidades/ExibirUnidade';
import Unidades from './screens/unidades/Unidades';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: route.name, 
          headerStyle: {
            backgroundColor: '#083344', 
          },
          headerTintColor: '#F0F4EF', 
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontFamily: 'Calibri'
          },
        })}
      >
        <Tab.Screen name="Suportes" component={ExibirSuporte} />
        <Tab.Screen
          name="Criar Suporte"
          component={(Suportes)} 
          options={{ tabBarButton: () => null, tabBarVisible: false }}
        />
        <Tab.Screen name="Unidades" component={ExibirUnidades} />
        <Tab.Screen
          name="Criar Unidade"
          component={(Unidades)} 
          options={{ tabBarButton: () => null, tabBarVisible: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
