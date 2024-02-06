import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import { useAppSettings } from '../AppSettings';

const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707150254/default/button.png';
function ImageButton({ background, title, onPress }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity style={styles.button} onPress={()=> onPress && onPress()}>
            <ImageBackground style={styles.container} source={{ uri: background }}>
                <Text style={styles.title} >
                    { title || 'Image Button'}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#00b23a',
        borderWidth: 5,
        borderColor: '#7cd4de',
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontFamil: 'Roboto',
        fontWeight: 'bold',
    }});

export default ImageButton;
