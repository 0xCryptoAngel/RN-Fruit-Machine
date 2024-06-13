import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import BuyNow from '../../../static/assets/buy_button.png';

import { useAppSettings } from '../AppSettings';

function BuyButton({ title, onPress , style }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={()=> onPress && onPress()}>
            <ImageBackground style={styles.button} source={BuyNow as ImageSourcePropType} resizeMode='contain'></ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
    },
    button: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 22,
        color: '#000000',
        fontFamily: 'Roboto',
        fontWeight: '800',
    }});

export default BuyButton;
