import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import NavigationRouter from './src/Navigation';
import store from './src/Store/store';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
