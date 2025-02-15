import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import { useAppSettings } from '../AppSettings';

const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707150254/default/button.png';
function ImageButton({ background, title, onPress , style }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={()=> onPress && onPress()}>
            <ImageBackground style={styles.button} source={{ uri: background }}>
                <Text style={styles.title} >
                    { title || 'Image Button'}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: '#B85EFF',
        borderWidth: 2,
        borderColor: '#BEFF96',
    },
    button: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    title: {
        fontSize: 22,
        color: '#FBFBFB',
        fontFamily: 'Roboto',
        fontWeight: '600',
    }});

export default ImageButton;
