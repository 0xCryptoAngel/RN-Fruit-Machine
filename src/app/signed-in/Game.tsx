import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, Image } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { useAppSettings } from '../components/AppSettings';
import { ImageButton } from '../components/buttons';
import { FruitMachine } from '../components/fruit-machine';
import Background from '../../static/assets/game-background.jpg';
// import GoldenTicket from '../../static/assets/golden-ticket.jpg';
function Game({route}: any) {
    const params = route.params;

    const theme = useTheme();
    const appSettings = useAppSettings();
    const linkTo = useLinkTo();
    const GoldenTicket = require('../../static/assets/golden-ticket.jpg');
    
    return (
        <Fragment>
            <ImageBackground style={styles.container} source={Background as ImageSourcePropType}>
                <View style={styles.titleGroup} >
                    {/* <View style={styles.ticket}>
                        <Image source={GoldenTicket as ImageSourcePropType} style={styles.logo} />
                    </View> */}
                    <Text style={styles.title}>Golden Ticket</Text>
                </View>
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
    titleGroup: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ticket: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'yellow',

    },
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
});

export default Game;
