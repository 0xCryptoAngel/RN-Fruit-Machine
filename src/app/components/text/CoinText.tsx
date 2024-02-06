import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, Image, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

import { useAppSettings } from '../AppSettings';

const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707150254/default/button.png';
function CoinText({ background, title, onPress }: any) {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 3,
            borderColor: '#7cd4de', paddingHorizontal: 5, paddingVertical: 5,
        }}>
            <Image style={styles.image} source={background} resizeMode='contain' />
            <Text style={styles.title} >
                {title || 'Image Button'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    }
});

export default CoinText;
