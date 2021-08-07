import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigation';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { onChange } from 'react-native-reanimated';
import { ProductsContext } from '../context/ProductsContext';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };


const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '', name = '' } = route.params;

    const { categories, isLoading } = useCategories();
    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext);
    const [tempUri, setTempUri] = useState<string>();

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: '',
    });

    useEffect(() => {
        navigation.setOptions({
            title: (nombre) ? nombre : 'Sin nombre del Producto'

        })
    }, [nombre]);

    useEffect(() => {
        loadProduct();
    }, [])


    const loadProduct = async () => {
        if (id.length === 0) return;
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            nombre,
            img: product.img || ''
        })
    }

    const saveOrUpdate = async () => {
        if (id.length > 0 ) {
            updateProduct(categoriaId, nombre, id);
        }else {


            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await addProduct( tempCategoriaId, nombre );
            onChange(newProduct._id, '_id');
        }
    }

    const takePhoto = () => {
        launchCamera({
            quality: 0.5,
            mediaType: 'photo',
        }, (resp) => {
            if(resp.didCancel) return;
            if( !resp.assets ) return;
            if (!resp.assets[0].uri) return;
            setTempUri(resp.assets[0].uri );
            uploadImage(resp, _id)

        });
    }

    const takePhotoFromGalery = () => {
        launchImageLibrary({
            quality: 0.5,
            mediaType: 'photo',
        }, (resp) => {
            if(resp.didCancel) return;
            if( !resp.assets ) return;
            if (!resp.assets[0].uri) return;
            setTempUri(resp.assets[0].uri );
            uploadImage(resp, _id)

        });
    }



    return (
        <View style={styles.container} >
            <ScrollView>
                <Text style={styles.label} >Nombre del producto: </Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={value => onChange(value, 'nombre')}
                />


                <Text style={styles.label} >Categoría: </Text>

                <Picker
                    selectedValue={categoriaId}
                    onValueChange={value => onChange(value, 'categoriaId')}
                >
                    {
                        categories.map(c => (

                            <Picker.Item
                                label={c.nombre}
                                value={c._id}
                                key={c._id}
                            />
                        ))
                    }



                </Picker>

                <Button
                    title='Guardar'
                    onPress={saveOrUpdate}
                    color='#5856d6'
                />

                {
                    (_id.length > 0 ) && 
                    (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                            <Button
                                title='Camara'
                                onPress={ takePhoto }
                                color='#5856d6'
                            />
                            <View style={{ width: 10, }} />
                            <Button
                                title='Galeria'
                                onPress={takePhotoFromGalery}
                                color='#5856d6'
                            />
        
                        </View>

                    )

                }


                {
                    (img.length > 0 && !tempUri ) && (
                        <Image
                            source={{ uri: img }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300,
                             }}
                         />
                    )
                }

                   
                {
                    (tempUri ) && (
                        <Image
                            source={{ uri: tempUri }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300,
                             }}
                         />
                    )
                }



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
