import { Fragment, useState, useEffect } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text, Image } from 'react-native';
import { FruitMachine } from '../components/fruit-machine';
import Background from '../../static/assets/game-background.jpg';
// import GoldenTicket from '../../static/assets/golden-ticket.jpg';

function Game({route}: any) {
    const params = route.params;
    const [refreshKey, setRefreshKey] = useState(0);
    
    const refreshFruitMachine = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        // Call the refresh function when params change
        refreshFruitMachine();
    }, [params]);

    return (
        <Fragment>
            <ImageBackground style={styles.container} source={Background as ImageSourcePropType}>
                {/* <View style={styles.titleGroup} >
                    <Text style={styles.title}>Golden Ticket</Text>
                </View> */}
                <FruitMachine key={refreshKey}/>
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
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40,
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
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 5, 

    },
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
});

export default Game;
