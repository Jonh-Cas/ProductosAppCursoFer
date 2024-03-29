import React, { useContext, useEffect } from 'react'
import { View, 
         Text, 
         TextInput, 
         Platform, 
         TouchableOpacity, 
         KeyboardAvoidingView, 
         Keyboard, 
         Alert} from 'react-native'
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps <any, any>{ }


const LoginScreen = ({navigation }: Props) => {

    const { signIn, errorMessege, removeError } = useContext(AuthContext)

    const { email, password, onChange }= useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(errorMessege.length === 0) return;
        Alert.alert(
            'login incorrecto',
             errorMessege,
             [
                 {
                     text: 'Ok',
                     onPress: removeError
                    }
             ]
             
             )

    }, [errorMessege])


    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();
        signIn({correo: email, password });
    }

    return (
        <>
            {/* Background */}
            <Background />

            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={(Platform.OS === 'ios' ) ? 'padding' : 'height'  }
            >

                <View style={loginStyles.formContainer} >


                    {/* Keyborad about View */}
                    <WhiteLogo />

                    <Text style={loginStyles.title} >Login  </Text>
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
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={ onLogin }
                        autoCapitalize='none'
                        autoCorrect={false}

                    />

                    {/* Boton login */}

                    <View style={loginStyles.buttonContainer} >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={ onLogin }
                        >
                            <Text style={loginStyles.buttonText} > Login </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crea una nueva cuenta  */}

                    <View style={loginStyles.newUserContainer} >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={loginStyles.buttonText} >Nueva cuenta   </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default LoginScreen;
