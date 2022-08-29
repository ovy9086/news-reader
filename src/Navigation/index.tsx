import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home';
import DetailsScreen from '../Screens/Details';
import { NewsItem } from '../Services/NewsApiService';
import WebView from '../Screens/WebView';

export type RootStackParamsList = {
  Home: undefined;
  Details: { item: NewsItem };
  WebView: { url: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();
function NavigationRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
        <Stack.Screen
          name='WebView'
          component={WebView}
          options={({ route }) => ({ presentation: 'modal', title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationRouter;
