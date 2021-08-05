import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigation';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { onChange } from 'react-native-reanimated';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };


const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '' , name = '' } = route.params;
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { categories, isLoading } = useCategories()

    const {_id, categoriaId, nombre, img, form, onChange } =  useForm({
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',  
    });

    useEffect(() => {
        navigation.setOptions({
            title: (name) ? name : 'Nuevo Producto'

        })
    }, []);


    return (
        <View style={styles.container} >
            <ScrollView>
                <Text style={styles.label} >Nombre del producto: </Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText= { value => onChange(value, 'nombre' ) }
                />


                <Text style={styles.label} >Nombre del producto: </Text>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                     {
                         categories.map( c => (
                             
                             <Picker.Item 
                                label={c.nombre } 
                                value={c._id } 
                                key={ c._id }    
                                />
                         ) )
                     }

                   
                   
                </Picker>

                <Button
                    title='Guardar'
                    //TODO: Por hacer 
                    onPress={() => { }}
                    color='#5856d6'
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                }}>
                    <Button
                        title='Camara'
                        //TODO: Por hacer 
                        onPress={() => { }}
                        color='#5856d6'
                    />
                    <View style={{ width: 10, }} />
                    <Button
                        title='Galeria'
                        //TODO: Por hacer 
                        onPress={() => { }}
                        color='#5856d6'
                    />

                </View>

                <Text>
                    { JSON.stringify(form, null, 5) }
                </Text>

            </ScrollView>
        </View>
    )
}

export default ProductScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 40,
        marginTop: 5,
        marginBottom: 15,
    }
});
