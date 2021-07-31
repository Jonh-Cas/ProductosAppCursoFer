import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps <any, any>{ }

const RegisterScreen = ({navigation }: Props) => {

    const { signUp, errorMessege, removeError } = useContext(AuthContext)

    const { email, password, name, onChange,  }= useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if(errorMessege.length === 0) return;
        Alert.alert(
            'Registro incorrecto',
             errorMessege,
             [
                 {
                     text: 'Ok',
                     onPress: removeError
                    }
             ]
             
             )

    }, [errorMessege])


    const onRegister = () => {
        console.log({ email, password, name });
        Keyboard.dismiss();
        signUp({
            nombre: name,
            correo: email,
            password,
        });

    }

        return (
            <>
                {/* Background */}

    
                <KeyboardAvoidingView 
                    style={{flex: 1 , backgroundColor: '#5856d6' }}
                    behavior={(Platform.OS === 'ios' ) ? 'padding' : 'height'  }
                >
    
                    <View style={loginStyles.formContainer} >
    
    
                        {/* Keyborad about View */}
                        <WhiteLogo />
    
                        <Text style={loginStyles.title} >Registro  </Text>
                        <Text style={loginStyles.label} >Nombre  </Text>
                        <TextInput
                            placeholder='Ingrese su Nombre: '
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            underlineColorAndroid='white'
                            style={[
                                loginStyles.inputField,
                                (Platform.OS === 'ios') && loginStyles.inputFielIOS
                            ]}
                            selectionColor='white'
    
                            onChangeText={(value) => onChange(value, 'name')  }
                            value={ name }
                            onSubmitEditing={onRegister}
                            autoCapitalize='words'
                            autoCorrect={false}
    
                        />


                        <Text style={loginStyles.label} >Email  </Text>
                        <TextInput
                            placeholder='Ingrese su Email: '
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            keyboardType='email-address'
                            underlineColorAndroid='white'
                            style={[
                                loginStyles.inputField,
                                (Platform.OS === 'ios') && loginStyles.inputFielIOS
                            ]}
                            selectionColor='white'
    
                            onChangeText={(value) => onChange(value, 'email')  }
                            value={ email }
                            onSubmitEditing={onRegister}
                            autoCapitalize='none'
                            autoCorrect={false}
    
                        />
    
                        <Text style={loginStyles.label} >Contraseña  </Text>
                        <TextInput
                            placeholder='**********'
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            secureTextEntry
                            underlineColorAndroid='white'
                            style={[
                                loginStyles.inputField,
                                (Platform.OS === 'ios') && loginStyles.inputFielIOS
                            ]}
                            selectionColor='white'
    
                            onChangeText={(value) => onChange(value, 'password')  }
                            value={ password }
                            onSubmitEditing={ onRegister }
                            autoCapitalize='none'
                            autoCorrect={false}
    
                        />
    
                        {/* Boton login */}
    
                        <View style={loginStyles.buttonContainer} >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={loginStyles.button}
                                onPress={ onRegister }
                            >
                                <Text style={loginStyles.buttonText} > Crear cuenta </Text>
                            </TouchableOpacity>
                        </View>
    
                        {/* Crea una nueva cuenta  */}
    
                            <TouchableOpacity
                                onPress={ () => navigation.replace('LoginScreen') }
                                activeOpacity={0.8}
                                style={ loginStyles.buttonReturn }
                            >
                                <Text style={loginStyles.buttonText } > Login </Text>
                            </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </>
        )
}

export default RegisterScreen;
