import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import { useAppSettings } from '../AppSettings';

const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707150254/default/button.png';
function ImageText({ background, title, onPress }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <ImageBackground style={styles.container} source={background} resizeMode='contain'>
            <Text style={styles.title} >
                {title || 'Image Button'}
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // width: '100%',
        // height: '100%',
        borderRadius: 5,
        width: 150,
        height: 200,
        // backgroundColor: '#00b23a',
        borderWidth: 5,
        borderColor: '#7cd4de',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    }
});

export default ImageText;
