import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
// this is our context, such as in the web the context api, it needs to wrap all structure
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1, backgroundColor: '#312e38 ' }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
