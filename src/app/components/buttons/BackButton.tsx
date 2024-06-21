import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BuyNow from '../../../static/assets/back_arrow_button.png';

function BackButton({ onPress, style }: any) {
    const navigation: any = useNavigation();
   
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={() => onPress ? onPress() : navigation.goBack()}>
            <ImageBackground style={styles.button} source={BuyNow as ImageSourcePropType} resizeMode='contain'></ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        paddingHorizontal: 2,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default BackButton;
