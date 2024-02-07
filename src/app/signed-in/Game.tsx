import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { useAppSettings } from '../components/AppSettings';
import { ImageButton } from '../components/buttons';
import { FruitMachine } from '../components/fruit-machine';
// const backgroundUri = 'https://res.cloudinary.com/dbrqh9owb/image/upload/v1707151370/default/simple-back.png';
const background = require('../../static/assets/game-background.jpg');
function Game() {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();

    return (
        <Fragment>
            <ImageBackground style={styles.container} source={background}>
                <FruitMachine />
            </ImageBackground>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    center: {
        alignItems: 'center',
    },
    fab: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 6,
        marginTop: -25,
    },
    button: {
        marginVertical: 5,
        width: 300,
    },
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
});

export default Game;
