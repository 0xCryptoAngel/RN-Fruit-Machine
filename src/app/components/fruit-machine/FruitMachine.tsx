import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, Animated, Button, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import AnimatedCounter from './AnimatedCounter';
import { ImageButton } from '../buttons';
import { ImageText, CoinText } from '../text';
import { ShopDialog, InviteDialog, MyVillageDialog, MapDialog } from '../dialogs';
import ImageMachine from '../../../static/assets/background-machine.png';
import { getUser, updateUser } from '../../services/gameService';
import { UserContext } from '../../App';
import { sendEmail } from '../../services/emailService';
import appConfig from '../../util/config';

const fruitList = [
    {
        name: 'Shield',
        value: 'Shield',
        image: require('../../../static/assets/shield.jpg'),
    },
    {
        name: 'Golden ticket',
        value: 'Golden ticket',
        image: require('../../../static/assets/golden-ticket.jpg'),
    },
    {
        name: 'Thief',
        value: 'Thief',
        image: require('../../../static/assets/thief.jpg'),
    },
    {
        name: 'More spins',
        value: 'More spins',
        image: require('../../../static/assets/more-spins.jpg'),
    },
    {
        name: 'Chocolate',
        value: 'Chocolate',
        image: require('../../../static/assets/cholocalte.jpg'),
    },
    {
        name: 'Bag of chocolates',
        value: 'Bag of chocolates',
        image: require('../../../static/assets/bag_of_chocolates.jpg'),
    },
    {
        name: 'Hat',
        value: 'Hat',
        image: require('../../../static/assets/hat.png'),
    },
    {
        name: 'Question mark',
        value: 'Question mark',
        image: require('../../../static/assets/question_mark.jpg'),
    },
]

const FruitMachine = () => {
    // const initialY = 0;
    const fruitWidth = 100, fruitHeight = 80, fruitCount = 8;
    const totalHeight = fruitCount * fruitHeight;

    const user = useContext(UserContext);

    const navigation: any = useNavigation();

    const [spinning, setSpinning] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isVisibleInvite, setVisibleInvite] = useState(false);
    const [isGolenTicket, setGoldenTicket] = useState(false);
    const [isVisibleMap, setVisibleMap] = useState(false);
    const [target, setTarget] = useState('Golden ticket');

    // const [fruitMachine, setFruitMachine]: any = useState({ // has 3 slots
    //     slot0: 0,// current number in slot data
    //     slot1: 0,
    //     slot2: 0,
    // });

    const [slotData, setSlotData] = useState([ // slot has 7 fruits
        [0, 1, 2, 3, 4, 5, 6, 7],// number in fruits list
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
    ])
    const [initialY, setInitialY] = useState([0, 0, 0]);
    // let initialY = [0, 0, 0];
    const [playerData, setPlayerData] = useState({
        spin_no: 0,
        spins: 0,
        coins: 0,
        shield: 0,
        golden_ticket_owned: false,
        golden_ticket_building: 'not yet',
        hasFrom: Date.now(),
    })

    const animations = useRef([
        new Animated.Value(initialY[0]),
        new Animated.Value(initialY[1]),
        new Animated.Value(initialY[2]),
    ]).current;

    // Function to shuffle an array
    const shuffleArray = (array: any) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const player: any = await getUser(user?.email);
                if (player) {
                    console.log('User found:', player);
                    setPlayerData(player);
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        const newSlotData = slotData.map(subArray => shuffleArray([...subArray]));
        setSlotData(newSlotData);
    
        fetchUserData();
    }, [user]);

    const handleSpinResult = async (machineStatus: any) => {
        let coinPlus = 0;
        let spinPlus = 0;
        let shieldPlus = 0;
        // console.log(machineStatus, slotData[0][machineStatus.slot0], slotData[1][machineStatus.slot1], slotData[2][machineStatus.slot2]);
        const fruitOfslot0 = slotData[0][machineStatus.slot0],
            fruitOfslot1 = slotData[1][machineStatus.slot1],
            fruitOfslot2 = slotData[2][machineStatus.slot2];
        const fruitData0 = fruitList[fruitOfslot0];
        const fruitData1 = fruitList[fruitOfslot1];
        const fruitData2 = fruitList[fruitOfslot2];

        console.log(`${fruitData0.name}, ${fruitData1.name}, ${fruitData2.name}`);
        // Fruit Game Logic here
        const bets: any = {
            'Shield': 0,
            'Golden ticket': 0,
            'Thief': 0,
            'More spins': 0,
            'Chocolate': 0,
            'Bag of chocolates': 0,
            'Hat': 0,
            'Question mark': 0
        }
        bets[fruitData0.name] = bets[fruitData0.name] + 1;
        bets[fruitData1.name] = bets[fruitData1.name] + 1;
        bets[fruitData2.name] = bets[fruitData2.name] + 1;

        console.log('bets status', bets);


        if (bets['Chocolate'] == 1) {
            coinPlus = 1200;
        }
        if (bets['Chocolate'] == 2) {
            coinPlus = 3000;
        }
        if (bets['Chocolate'] == 3) {
            coinPlus = 10000;
        }

        if (bets['Bag of chocolates'] == 1) {
            coinPlus += 2500;
        }
        if (bets['Bag of chocolates'] == 2) {
            coinPlus += 8000;
        }
        if (bets['Bag of chocolates'] == 3) {
            coinPlus += 20000;
        }

        if (bets['Hat'] == 1) {
            coinPlus += 5000;
        }
        if (bets['Hat'] == 2) {
            coinPlus += 10000;
        }
        if (bets['Hat'] == 3) {
            coinPlus += 75000;
        }

        if (bets['Shield'] == 3) {// protect from attackers
            shieldPlus += 3;
        }
        if (bets['Golden ticket'] == 3) {// gives a chance to steal the ticket
            setTarget('Golden ticket');
            setVisibleMap(true);
            // setGoldenTicket(true);
        }

        if (bets['Thief'] == 3) {// gives a chance to steal coins
            setTarget('Coin');
            setVisibleMap(true);
        }
        if (bets['More spins'] == 3) {// gives more spin
            spinPlus += 200;
        }

        if (bets['Question mark'] == 3) {// gives more spin
            spinPlus += Math.ceil(Math.random() * 10) * 50;
            coinPlus += Math.ceil(Math.random() * 10) * 500;
        }

        // save result
        const newData = {
            spin_no: Math.min(playerData.spin_no + 1, playerData.spins),
            coins: playerData.coins + coinPlus,
            spins: playerData.spins + spinPlus,
            shield: playerData.shield + shieldPlus,
        }
        console.log(newData);
        updateUser(user?.email, newData)
            .then(() => {
                console.log('User updated successfully');
                setPlayerData({
                    ...playerData,
                    ...newData
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    const spin = () => {
        setSpinning(true);

        // Randomize the stopping point for each slot
        const slotStatus: any = {};
        // console.log(initialY);
        const currentSlotY = [0, 0, 0];
        animations.forEach((anim, index) => {
            anim.setValue(initialY[index]);

            let randomNumber = Math.ceil(Math.random() * (fruitCount - 1));
            let finalPosition = -randomNumber * fruitHeight;
            if (finalPosition == initialY[index]) {
                randomNumber += 2;
                finalPosition = -randomNumber * fruitHeight;
            }
            currentSlotY[index] = finalPosition;

            // slotStatus[`slot${index}`] = (fruitMachine[`slot${index}`] + randomNumber) % fruitCount;
            slotStatus[`slot${index}`] = (randomNumber + 1) % fruitCount;
            Animated.timing(anim, {
                toValue: finalPosition,
                duration: 500 + (index * 200),
                useNativeDriver: true,
            }).start(() => {
                if (index === animations.length - 1) {
                    setSpinning(false);
                    // setFruitMachine(slotStatus);
                    handleSpinResult(slotStatus);
                    setInitialY(currentSlotY);
                    // console.log('spin result', slotStatus);
                }
            });
        });
    };

    const onBuyCoinSpin = async (params: any) => {
        console.log(params);
        setVisible(false);

        navigation.navigate('Payment', {
            'item': params.type,
            'amount': params.value,
            'cost': params.cost,
            'currentSpins': playerData.spins,
            'currentCoins': playerData.coins,
        });
    }
    const onInvite = async (params: any) => {
        console.log('invite dialog', params);
        await sendEmail({
            from: appConfig.adminEmail,
            to: params.email,
            subject: `Invitation from Golden Ticket`,
            content: params.message
        });
        const coinPlus = 20000;
        const spinPlus = 200;
        const newData = {
            coins: playerData.coins + coinPlus,
            spins: playerData.spins + spinPlus,
        }
        setPlayerData({
            ...playerData,
            ...newData
        });
        await updateUser(user?.email, newData);
        setVisibleInvite(false);

    }
    const onGoldenTicket = async (params: any) => {
        console.log(params);
        updateUser(user?.email, {
            golden_ticket_owned: true,
            [params.value]: {
                ...params,
                tickets: 1,
            }
        })
            .then(() => {
                console.log('User updated successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const onMap = async (params: any) => {
        setVisibleMap(false);
        console.log('params from map dialog', params);
        if (target == "Golden ticket") {
            if (params.golden_ticket_owned && (params.golden_ticket_building == params.selectedBuilding)) {
                const randomNumber = Math.floor(Math.random() * 4) + 1;// random building number
                await updateUser(user?.email, {
                    golden_ticket_owned: true,
                    golden_ticket_building: `building${randomNumber}`,
                    hasFrom: Date.now(),
                });

                await updateUser(params.email, {
                    golden_ticket_owned: false,
                    golden_ticket_building: `building${-1}`,
                    hasFrom: Date.now(),
                });

                setPlayerData({
                    ...playerData,
                    golden_ticket_owned: true,
                    golden_ticket_building: `building${randomNumber}`,
                    hasFrom: Date.now(),
                })
            }
        }
        if (target == "Coin") {
            const currentCoins = params.coins;// random building number
            await updateUser(user?.email, {
                coins: playerData.coins + currentCoins * 0.25,
            });

            await updateUser(params.email, {
                coins: currentCoins * 0.75,
            });

            setPlayerData({
                ...playerData,
                coins: playerData.coins + currentCoins * 0.25,
            })
        }
    }
    const getOwnedDays = (hasFrom: any) => {
        let result = 0;
        const currentTimestamp = Date.now();
        const differenceInMilliseconds = currentTimestamp - hasFrom;
        result = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        return `${result} days`;
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.machine} source={ImageMachine as ImageSourcePropType} resizeMode="stretch" >
                <View style={styles.slotsContainer} >
                    {animations.map((anim, index) => (
                        <Animated.View key={index} style={[styles.slot, { transform: [{ translateY: anim }] }]}>
                            {slotData[index].map((fruitNo, fruitIndex) => (
                                <Image key={fruitIndex} source={fruitList[fruitNo].image} style={styles.fruitImage} />
                            ))}
                            {slotData[index].map((fruitNo, fruitIndex) => (
                                <Image key={fruitList.length + fruitIndex} source={fruitList[fruitNo].image} style={styles.fruitImage} />
                            ))}
                        </Animated.View>
                    ))}
                </View>
            </ImageBackground>
            <View style={styles.gameDetail}>
                <View style={styles.infoRow}>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`Spins`}</Text>
                        <Text style={styles.valueText}>{`${playerData.spins}`}</Text>
                    </View>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`Available`}</Text>
                        <Text style={styles.valueText}>{`${playerData.spins - playerData.spin_no}`}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`Coins`}</Text>
                        <Text style={styles.valueText}>{`${playerData.coins}`}</Text>
                    </View>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`Shield     `}</Text>
                        <Text style={styles.valueText}>{`${playerData.shield}`}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`Golden Ticket`}</Text>
                        <Text style={styles.valueText}>{`${playerData.golden_ticket_owned ? 'Yes' : "No"}`}</Text>
                    </View>
                    <View style={styles.textGroup}>
                        <Text style={styles.labelText}>{`For`}</Text>
                        <Text style={styles.valueText}>{ playerData.golden_ticket_owned ? getOwnedDays(playerData.hasFrom): '0 day'}</Text>
                    </View>
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={styles.counterContainer}>
                    <Text style={{ fontSize: 16, color: '#fff', paddingHorizontal: 5, fontFamily: 'Roboto' }}>{`Spins(${playerData.spins})`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AnimatedCounter targetValue={playerData.spins - playerData.spin_no} duration={5000} />
                    </View>
                </View>
                <View style={styles.coinContainer}>
                    <CoinText background={require('../../../static/assets/coin.jpg')} title={playerData.coins} />
                </View>
            </View> */}
            <ImageButton title={"SPIN"} onPress={spin} disabled={spinning} />
            <ImageButton title={"SHOP"} onPress={() => setVisible(true)} disabled={spinning} style={{ marginTop: 10, }} />
            <ImageButton title={"BONUS"} onPress={() => setVisibleInvite(true)} disabled={spinning} style={{ marginTop: 10, }} />
            {/* <ImageButton title={"BACK"} onPress={() => navigation.navigate('Home')} disabled={spinning} style={{ marginTop: 10, }} /> */}

            <ShopDialog isOpen={isVisible} onOK={(params: any) => onBuyCoinSpin(params)} onCancel={() => setVisible(false)} />
            <InviteDialog isOpen={isVisibleInvite} onOK={(params: any) => onInvite(params)} onCancel={() => setVisibleInvite(false)} />

            <MyVillageDialog isOpen={isGolenTicket} onOK={(params: any) => onGoldenTicket(params)} onCancel={() => setGoldenTicket(false)} />
            <MapDialog isOpen={isVisibleMap} email={user?.email} target={target} onOK={(params: any) => onMap(params)} onCancel={() => setVisibleMap(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 30,
        borderRadius: 10,
    },
    machine: {
        width: 360,
        height: 370,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slotsContainer: {
        flexDirection: 'row',
        height: 240,
        overflow: 'hidden',
        marginVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    slot: {
        width: 100,
    },
    fruitImage: {
        width: 100,
        height: 80,
        marginVertical: 0,
        borderColor: '#fed49a',
        borderWidth: 1,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#410577',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 20,
    },
    coinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#410577',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 10,
    },
    gameDetail: {
        width: '100%',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#410577',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 20,
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textGroup: {
        // flex: 1,
        width: "50%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    labelText: {
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 5,
        fontFamily: 'Roboto'
    },
    valueText: {
        fontSize: 20,
        color: '#f80',
        paddingHorizontal: 5,
        fontFamily: 'Roboto'
    }
});

export default FruitMachine;
