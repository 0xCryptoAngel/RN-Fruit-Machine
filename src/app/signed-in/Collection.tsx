import { Fragment, useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../App';
import { BackButton, ImageButton } from '../components/buttons';
import { MapDialog } from '../components/dialogs';
import ResultDialog from '../components/dialogs/ResultDialog';

import Background from '../../static/assets/chest-opened.jpg';
import { CARDS } from '../constants';

import { getUser, updateUser } from '../services/gameService';

function CollectionScreen() {

    const navigation: any = useNavigation();
    const numColumns = 2;
    const [playerData, setPlayerData]: any = useState({});
    const [cards, setCards] = useState([]);
    const [isVisibleMap, setVisibleMap] = useState(false);
    const [target, setTarget] = useState('Coin');
    const [isVisibleResult, setVisibleResult] = useState(false);

    const user = useContext(UserContext);

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

    }, [user]);

    useEffect(() => {
        if (!playerData.cardInfo) { return }

        console.log('player data', playerData.cardInfo);

        const updatedCards: any = CARDS.map((card: any) => {

            return {
                ...card,
                count: playerData.cardInfo[card.key] || 0
            }

        });
        setCards(updatedCards);
    }, [playerData]);

    const [resultData, setResultData] = useState([
        {
            name: 'Coin',
            description: 'You can use coin to buy cards',
            amount: 34500,
        }
    ]);

    const openMapDailog = (target: string) => {
        setTarget(target);
        setVisibleMap(true);
    }

    const onUseCard = async (params: any) => {

        console.log(params);
        console.log('used this card', params);
        const updatedPlayerData = {
            ...playerData,
            cardInfo: {
                ...playerData.cardInfo,
                [params.key]: playerData.cardInfo[params.key] - 1
            }
        }

        if (params.key == "steal_coin") {
            openMapDailog('Coin');
        }
        if (params.key == "steal_block") {
            openMapDailog('Block');
        }

        if (params.key == "coin_200k") {
            updatedPlayerData.coins = updatedPlayerData.coins + 200 * 100000
        }
        if (params.key == "coin_2x") {
            updatedPlayerData.coins = updatedPlayerData.coins * 2
        }
        if (params.key == "extra_spins_10") {
            updatedPlayerData.spins = updatedPlayerData.spins + 10
        }
        if (params.key == "extra_spins_20") {
            updatedPlayerData.spins = updatedPlayerData.spins + 20
        }
        if (params.key == "extra_spins_30") {
            updatedPlayerData.spins = updatedPlayerData.spins + 30
        }
        if (params.key == "extra_spins_40") {
            updatedPlayerData.spins = updatedPlayerData.spins + 40
        }
        if (params.key == "shield") {
            updatedPlayerData.shield = updatedPlayerData.shield + 1
        }
        if (params.key == "shield_2x") {
            updatedPlayerData.shield = updatedPlayerData.shield + 2
        }
        if (params.key == "shield_3x") {
            updatedPlayerData.shield = updatedPlayerData.shield + 3
        }
        if (params.key == "time_keeper5") {
            console.log('you got time keeper5');
        }

        if (params.key == "block") {
            updatedPlayerData.block = (updatedPlayerData.block || 0) + 1;
        }
        if (params.key == "block2") {
            updatedPlayerData.block = (updatedPlayerData.block || 0) + 2;
        }
        if (params.key == "block3") {
            updatedPlayerData.block = (updatedPlayerData.block || 0) + 3;
        }
        if (params.key == "block4") {
            updatedPlayerData.block = (updatedPlayerData.block || 0) + 4;
        }

        if (updatedPlayerData.block > updatedPlayerData.level * 10) { // Level UP
            updatedPlayerData.level = updatedPlayerData.level + 1;
            updatedPlayerData.block = 0;
        }

        setPlayerData(updatedPlayerData);
        updateUser(user?.email, updatedPlayerData)
            .then(() => {
                console.log('User updated successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const onAttack = async (params: any) => {
        setVisibleMap(false);
        console.log('params from map dialog', params);
        
        if (target == "Coin") {
            const currentCoins = params.coins;// random building number
            const stealAmount = Math.floor(currentCoins * 0.1);
            await updateUser(user?.email, {
                coins: playerData.coins + stealAmount,
            });

            await updateUser(params.email, {
                coins: currentCoins - stealAmount,
            });

            setPlayerData({
                ...playerData,
                coins: playerData.coins + stealAmount,
            });
            setResultData([
                {
                    name: 'Coin',
                    description: 'You stole the coins',
                    amount: stealAmount,
                }
            ])
        }
        if (target == "Block") {

            const stealAmount = params.block ? Math.floor(params.block * 0.10) : 0;
            let updatedBlock = playerData.block + stealAmount;
            let updatedLevel = playerData.level;
            if (updatedBlock > playerData.level * 10) {
                updatedBlock = 0;
                updatedLevel = updatedLevel + 1; // level up
            }
            await updateUser(user?.email, {
                block: updatedBlock,
                level: updatedBlock
            });

            await updateUser(params.email, {
                block: params.block - stealAmount,
            });

            setPlayerData({
                ...playerData,
                block: updatedBlock,
                level: updatedLevel,
            });
            setResultData([
                {
                    name: 'Block',
                    description: 'You stole the blocks',
                    amount: stealAmount,
                }
            ])
        }
        setVisibleResult(true);
    }
    const GridItem = ({ item }: any) => (
        <View style={styles.gridItem}>
            <TouchableOpacity key={item.title} style={styles.coinItem} onPress={() => onUseCard(item)}>
                <ImageBackground source={item.image} style={styles.spinImage} >
                    <Text style={styles.price}>{`${item.count}`}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );

    return (
        <Fragment>
            <ImageBackground style={styles.container} source={Background as ImageSourcePropType}>
                <View style={{ width: '100%', height: '100%', borderRadius: 10 }}>
                    <Text style={styles.titleText}>Collections</Text>
                    <FlatList
                        data={cards}
                        renderItem={({ item }) => <GridItem item={item} />}
                        keyExtractor={(item: any) => item.key}
                        numColumns={numColumns}
                        contentContainerStyle={styles.contentContainer}
                    />
                </View>
                <BackButton style={{ position: 'absolute', zIndex: 10, right: 5, top: 5 }} />
            </ImageBackground>
            <MapDialog isOpen={isVisibleMap} email={user?.email} target={target} onOK={(params: any) => onAttack(params)} onCancel={() => setVisibleMap(false)} />
            <ResultDialog isOpen={isVisibleResult} data={resultData} onCancel={() => setVisibleResult(false)} />

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
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 10
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
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 10,
    },
    items: {
        paddingHorizontal: 30,
    },
    contentContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    gridItem: {
        flex: 1,
        margin: 10,
        backgroundColor: '#ccc',
        // borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        padding: 5,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    coinItem: {
        alignItems: 'center',
    },
    spinItem: {

    },
    spinImage: {
        width: 150,
        height: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain'
    },
});

export default CollectionScreen;
