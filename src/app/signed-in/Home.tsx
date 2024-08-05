import { Fragment } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { ImageButton, GameButton, BackButton } from '../components/buttons';
// import background from '../../static/assets/golden_splash.jpg';
import background from '../../static/assets/default/block_bandit_logo.png';
import ImagePlay from '../../static/assets/default/play_button.png';
import ImageExit from '../../static/assets/default/exit.png';

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
                    <GameButton background={ImagePlay} title={"SPIN"} onPress={() => navigation.navigate('Game')} disabled={false} style={{ width: 300, height: 100, marginBottom: 50 }} />
                    {/* <ImageButton title={"Log Out"} onPress={() => signOut()} style={{ marginBottom: 30, }} /> */}
                </View>
                <BackButton style={{ position: 'absolute', zIndex: 10, right: 10, top: 10 }} buttonImage={ImageExit} onPress={() => signOut()} />
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
