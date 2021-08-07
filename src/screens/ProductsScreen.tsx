import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigation';

interface  Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{};


const ProductsScreen = ({navigation, }: Props) => {

const {products, loadProducts } = useContext(ProductsContext);
const [isRefreshing, setIsRefreshing] = useState(false);


useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
                activeOpacity={ 0.8 }
                style={{ marginRight: 10,} }
                onPress={ () => navigation.navigate('ProductScreen', {})  }
            >
                <Text> Agregar </Text>
            </TouchableOpacity>
        )
    })
}, [])

    const loadProductFromBackend = async() => {
        setIsRefreshing(true);
        await loadProducts();
        setIsRefreshing(false);
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 5 }} >
                <FlatList 
                    data={products}
                    keyExtractor={  p => p._id }
                    renderItem={({item}) => (
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ 
                                () => navigation.navigate('ProductScreen',{
                                    id: item._id,
                                    name: item.nombre,
                                }) }
                        >
                            <Text style={styles.productName} >{item.nombre} </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={ ()  => (
                        <View 
                            style={styles.itemSeparator}
                        />
                    ) }
                    refreshControl={ 
                        <RefreshControl 
                            refreshing={isRefreshing }
                            onRefresh={ loadProductFromBackend }
                        />
                     }
                />  
        </View>
    )
}

export default ProductsScreen;

const styles = StyleSheet.create({
    productName: {
        fontSize: 20,
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    }
});