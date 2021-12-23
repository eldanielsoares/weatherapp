import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from './global/styles/theme';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Home />
    </>
  );
};


export default App;
