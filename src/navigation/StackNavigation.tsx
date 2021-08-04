import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import ProductsNavigation from './ProductsNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {

  const { status } = useContext(AuthContext);

  if( status === 'checking' ) return <LoadingScreen />


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (status !== 'authenticaded')
          ? <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          :
          <>
          <Stack.Screen name="ProductsNavigation" component={ProductsNavigation} />
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
          
          </> 
      }


    </Stack.Navigator>
  );
}

export default StackNavigation;