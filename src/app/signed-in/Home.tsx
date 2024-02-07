import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useAppSettings } from '../components/AppSettings';
import { ImageButton } from '../components/buttons';
const background = require('../../static/assets/golden_splash.jpg');
function Home() {
    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ImageBackground style={styles.container} source={background}>
                <ImageButton  title={"Play"} onPress={()=> navigation.navigate('Game')} style={{ marginVertical: 10,}}/>
                <ImageButton  title={"Settings"} onPress={()=> navigation.navigate('Settings')} style={{ marginBottom: 30,}}/>
            </ImageBackground>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
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

export default Home;
