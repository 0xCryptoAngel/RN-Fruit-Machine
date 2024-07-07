import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import ImageBlock from '../../../static/assets/towers/tower_block_peice.png';

interface ColorBlockProps {
    level?: any;
    text?: any;
    backgroundImage?: any;
    color?: string;
    style?: any;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ level, text, backgroundImage, color, style }) => {
    return (
        <ImageBackground source={ImageBlock as ImageSourcePropType} style={[styles.background, style]} resizeMode='stretch'>
            <View style={[styles.container, { backgroundColor: color || `rgba(0, 255, 0, ${ 0.01 * level })`}]}>
                <Text style={styles.levelText}>{text}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 0, 0.2)'
    },
    coinIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ColorBlock;
