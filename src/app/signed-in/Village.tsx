import { Fragment, useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { UserContext } from '../App';

import { getUser, updateUser } from '../services/gameService';

import { BackButton, ImageButton, GameButton } from '../components/buttons';

import { CARDS } from '../constants';

import ImageCardLibrary from '../../static/assets/castle_back_ground.png';
import ImageBuildingEnchanted from '../../static/assets/castles/castles_magic.png';
import ImageBuildingProtection from '../../static/assets/castles/castles_defence.png';
import ImageBuildingResource from '../../static/assets/castles/castles_resource.png';
import ImageBuildingAttack from '../../static/assets/castles/castles_attack.png';
import ImageArrowLeft from '../../static/assets/arrow_left.png';
import ImageArrowRight from '../../static/assets/arrow_right.png';
import ImageGenerate from '../../static/assets/default/generate_button.png';
import ImagePerks from '../../static/assets/default/perks_button.png';
import ImageTower from '../../static/assets/default/towers_button.png';

import ResultDialog from '../components/dialogs/ResultDialog';
import CoinBar from '../components/custom/CoinBar';
import BlockBar from '../components/custom/BlockBar';
import LevelBar from '../components/custom/LevelBar';
import ConfirmDialog from '../components/dialogs/ConfirmDialog';

function VillageScreen() {

    const navigation: any = useNavigation();
    const user = useContext(UserContext);

    const [playerData, setPlayerData]: any = useState({});
    const [buildingIndex, setBuildingIndex] = useState(0);
    const [visibleResultDialog, setVisibleResultDialog] = useState(false);
    const [resultData, setResultData] = useState([{ name: 'Test', description: 'Description', amount: 1 }]);
    const buildings = [
        {
            type: 'building',
            title: 'Enchanted',
            value: 'building1',
            image: ImageBuildingEnchanted,
            boxCost: (playerData?.level || 1) * 1000, // 3000
            //boxImage: ImageBoxEnchanted,
            cards: [
                // 'time_keeper5',
                'block', // towers has blocks and it effect the level of user
                'block2',
                'block3',
                'block4'
            ]
        },
        {
            type: 'building',
            title: 'Protection',
            value: 'building2',
            image: ImageBuildingProtection,
            boxCost: 4000,
            //boxImage: ImageBoxProtection,
            cards: [
                'shield',
                'shield_2x',
                'shield_3x',
            ]
        },
        {
            type: 'building',
            title: 'Resource',
            value: 'building3',
            image: ImageBuildingResource,
            boxCost: 5000,
            //boxImage: ImageBoxResource,
            cards: [
                'coin_200k',
                'coin_2x',
                'extra_spins_10',
                'extra_spins_20',
                'extra_spins_30',
                'extra_spins_40',
            ]
        },
        {
            type: 'building',
            title: 'Attack',
            value: 'building4',
            image: ImageBuildingAttack,
            boxCost: 6000,
            //boxImage: ImageBoxAttack,
            cards: [
                'steal_coin',
                'steal_block',
                // 'steal_ticket',
            ]
        },

    ]
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

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

    const handlePressArrowButton = (direction: string) => {
        const buildingLength = buildings.length;
        let index = buildingIndex;
        if (direction == 'left') {
            index = index - 1;
            if (index < 0) { index = buildings.length - 1; }
        }
        if (direction == 'right') {
            index = index + 1;
            if (index > buildings.length - 1) { index = 0; }
        }
        setBuildingIndex(index)
    }
    const onBuyCard = () => {
        const building: any = buildings[buildingIndex];
        console.log('selected box', building);
        if (playerData.coins < building.boxCost) {
            console.log('nagative balcance');
            return;
        }
        setConfirmDialogVisible(true);
    }
    const handleConfirm = () => {
        setConfirmDialogVisible(false);
        // Handle the confirmation action
        console.log('Purchase confirmed!');

        const building: any = buildings[buildingIndex];
        const cardLength = building.cards?.length;
        if (cardLength == 0) { return; }
        const index = Math.floor(Math.random() * cardLength);
        const cardKey = building.cards[index];
        console.log('card', cardKey, playerData.cardInfo[cardKey]);
        const updatedValue = !playerData.cardInfo[cardKey] ? 1: playerData.cardInfo[cardKey] + 1;
        updateUser(user?.email, {
            coins: playerData.coins - building.boxCost,
            cardInfo: {
                ...playerData.cardInfo,
                [cardKey]: updatedValue
            }
        })
            .then(() => {
                console.log('User updated successfully');

                setPlayerData({
                    ...playerData,
                    coins: playerData.coins - building.boxCost,
                    cardInfo: {
                        ...playerData.cardInfo,
                        [cardKey]: updatedValue
                    }
                });

                const card: any = CARDS.find((item: any) => item.key == cardKey);
                setResultData([{
                    name: card.name,
                    description: `You got card called ${card.name}`,
                    amount: 1,
                }]);
                setVisibleResultDialog(true);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleCancel = () => {
        setConfirmDialogVisible(false);
    };
    return (
        <Fragment>
            <ImageBackground style={styles.container} source={ImageCardLibrary as ImageSourcePropType}>
                <View style={styles.status} >
                    {/* <ImageBackground style={styles.titleImage} source={ImageTitle as ImageSourcePropType} resizeMode="contain" /> */}
                    <LevelBar currentAmount={playerData.level} targetAmount={40} />
                    <BlockBar currentAmount={playerData.block} targetAmount={playerData.level * 10} />
                    <CoinBar coinAmount={playerData.coins} />
                </View>
                <View style={styles.castles}>
                    <View style={styles.castle}>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => handlePressArrowButton('left')}>
                            <ImageBackground style={styles.arrowImage} source={ImageArrowLeft as ImageSourcePropType} resizeMode='contain' />
                        </TouchableOpacity>
                        <ImageBackground style={styles.castleImage} source={buildings[buildingIndex].image as ImageSourcePropType} resizeMode='contain' />
                        <TouchableOpacity style={styles.arrowButton} onPress={() => handlePressArrowButton('right')}>
                            <ImageBackground style={styles.arrowImage} source={ImageArrowRight as ImageSourcePropType} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <GameButton background={ImageGenerate} title={"Generate"} onPress={onBuyCard} disabled={false} style={{ width: 300, height: 50, marginBottom: 5 }} />
                    <GameButton background={ImagePerks} title={"Perks"} onPress={() => navigation.navigate('Collection')} disabled={false} style={{ width: 300, height: 50, marginBottom: 0 }} />
                    <GameButton background={ImageTower} title={"My Tower"} onPress={() => navigation.navigate('Tower')} disabled={false} style={{ width: 300, height: 50, marginBottom: 0 }} />
                </View>
                <BackButton style={{ position: 'absolute', zIndex: 10, right: 5, top: 5 }} />
            </ImageBackground>

            <ResultDialog
                isOpen={visibleResultDialog}
                data={resultData}
                onCancel={() => setVisibleResultDialog(false)}
            />
            <ConfirmDialog
                visible={confirmDialogVisible}
                cost={buildings[buildingIndex].boxCost}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
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
    buttons: {
        width: 250,
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
    castles: {
        width: '100%',
        height: 320,
        backgroundColor: '#fed08d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    castle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
    },
    castleImage: {
        width: 250,
        height: 450,
        resizeMode: 'cover'
    },
    arrowButton: {
        width: 30,
        height: 50,
        // backgroundColor: '#f1f1f1'
    },
    arrowImage: {
        width: 30,
        height: 50,
        resizeMode: 'contain',
    },
    status: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fec689',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#02dce1'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fd3f27'
    },
    priceText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: '#333',
    },
    titleImage: {
        width: '100%',
        height: 80,
        // paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
});

export default VillageScreen;
