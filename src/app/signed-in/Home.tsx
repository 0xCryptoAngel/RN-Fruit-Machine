import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { ImageButton } from '../components/buttons';
import background from '../../static/assets/golden_splash.jpg';

function Home() {
    
    const navigation: any = useNavigation();
    async function signOut() {
        // setSigningOut(true);
        // await GoogleSignin.signOut();
        await auth().signOut();
    }
    return (
        <Fragment>
            <ImageBackground style={styles.container} source={background as ImageSourcePropType}>
                <View style={styles.buttons}>
                    <ImageButton title={"Play Now"} onPress={() => navigation.navigate('Game')} style={{ marginVertical: 10, }} />
                    <ImageButton title={"Settings"} onPress={() => navigation.navigate('Settings')} style={{ marginBottom: 10, }} />
                    <ImageButton title={"Log Out"} onPress={() => signOut()} style={{ marginBottom: 30, }} />
                </View>
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
    buttons: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
});

export default Home;
