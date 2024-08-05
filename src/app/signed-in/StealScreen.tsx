import { Fragment, useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BackButton } from '../components/buttons';
import background from '../../static/assets/towers/blocks_tower_background.png';
import Steal from '../components/steal';
import { UserContext } from '../App';

import { getUser } from '../services/gameService';

function StealScreen() {

    const user = useContext(UserContext);
    const route = useRoute();
    const { email }: any = route.params;

    const [playerData, setPlayerData]: any = useState({
        level: 3,
        block: 10
    })

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            try {
                const player: any = await getUser(user?.email);
                if (isMounted) {
                    if (player) {
                        console.log('User found:', player);
                        setPlayerData(player);
                    } else {
                        console.log('User not found');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [])

    return (
        <Fragment>
            <ImageBackground style={styles.container} source={background as ImageSourcePropType}>
                <Steal targetId={email} />
                <BackButton style={{ position: 'absolute', zIndex: 10, right: 10, top: 10 }} />
            </ImageBackground>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default StealScreen;
