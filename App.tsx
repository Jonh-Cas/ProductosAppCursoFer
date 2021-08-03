import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductosContext';

// const AppState = ({children }: { children: JSX.Element | JSX.Element[] } ) => {

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductProvider>
      {children}
      </ProductProvider>
    </AuthProvider>
  );
}


const App = () => {
  return (

    <NavigationContainer>
      <AppState>

        <StackNavigation />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
