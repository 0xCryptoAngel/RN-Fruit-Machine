import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, Image } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import { useAppSettings } from '../AppSettings';

const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707150254/default/button.png';

function GameButton({ background, title, onPress, style }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={() => onPress && onPress()}>
            {/* <Image source={background} style={styles.button} /> */}
            <ImageBackground style={styles.button} source={background} resizeMode='contain'/>
            {/* <Text style={styles.title} >
                {title || 'Image Button'}
            </Text> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'center',
        // width: '100%',
        // height: 60,
        // paddingHorizontal: 20,
        // borderRadius: 25,
        // backgroundColor: '#B85EFF',
        // borderWidth: 2,
        // borderColor: '#BEFF96',
    },
    button: {
        width: 150,
        height: 50,
        // resizeMode: 'contain', 
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 25,
    },
    title: {
        fontSize: 22,
        color: '#FBFBFB',
        fontFamily: 'Roboto',
        fontWeight: '600',
    }
});

export default GameButton;
