import React from 'react';
import 'react-native-gesture-handler';
import Nav from './components/Nav';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
};

export default App;
