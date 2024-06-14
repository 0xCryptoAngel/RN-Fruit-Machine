import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, Animated, Easing, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import AnimatedCounter from './AnimatedCounter';
import ConfettiCannon from 'react-native-confetti-cannon';
import { ImageButton, GameButton } from '../buttons';
import { ImageText, CoinText } from '../text';
import { ShopDialog, InviteDialog, MyVillageDialog, MapDialog, MyCardsDialog, SpinsOutDialog } from '../dialogs';
import ImageMachine from '../../../static/assets/background-machine.png';
import ImageSpin from '../../../static/assets/spin_button_small.png';
import ImageGoldenTicket from '../../../static/assets/golden-ticket-small.png';
import ImageShield from '../../../static/assets/shield.png';
import ImageShop from '../../../static/assets/shop-2.png';
import ImageBonus from '../../../static/assets/business-earning.png';
import ImageCoinBack from '../../../static/assets/coin-bar.png';
import ImageTimerBack from '../../../static/assets/timer-bar.png';
import ImageSpinBack from '../../../static/assets/spin-bar.png';
import ImageGoldenTicketBlank from '../../../static/assets/golden-ticket-blank.png';
import ImageShieldBlank from '../../../static/assets/shield-blank.png';
import ImageLogoText from '../../../static/assets/logo-text.png';
import ImageMyVillage from '../../../static/assets/myvillage.png';

import { getUser, updateUser } from '../../services/gameService';
import { UserContext } from '../../App';
import { sendEmail } from '../../services/emailService';
import appConfig from '../../util/config';

const fruitList = [
    {
        name: 'Shield',
        value: 'Shield',
        image: require('../../../static/assets/shield.png'),
    },
    {
        name: 'Golden ticket',
        value: 'Golden ticket',
        image: require('../../../static/assets/golden-ticket.png'),
    },
    {
        name: 'Thief',
        value: 'Thief',
        image: require('../../../static/assets/thief.png'),
    },
    {
        name: 'More spins',
        value: 'More spins',
        image: require('../../../static/assets/more-spins.png'),
    },
    {
        name: 'Chocolate',
        value: 'Chocolate',
        image: require('../../../static/assets/cholocalte.png'),
    },
    {
        name: 'Bag of chocolates',
        value: 'Bag of chocolates',
        image: require('../../../static/assets/bag_of_chocolates.png'),
    },
    {
        name: 'Hat',
        value: 'Hat',
        image: require('../../../static/assets/hat.png'),
    },
    {
        name: 'Question mark',
        value: 'Question mark',
        image: require('../../../static/assets/question_mark.png'),
    },
]

const FruitMachine = () => {

    const fruitWidth = 100, fruitHeight = 80, fruitCount = 8;
    const posY = -(fruitCount + 5) * fruitHeight;// initial position

    const user = useContext(UserContext);

    const navigation: any = useNavigation();


    const [spinning, setSpinning] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isVisibleInvite, setVisibleInvite] = useState(false);
    const [isGolenTicket, setGoldenTicket] = useState(false);
    const [isVisibleMap, setVisibleMap] = useState(false);
    const [isVisibleVillage, setVisibleVillage] = useState(false);
    const [isVisibleSpinsOut, setVisibleSpinsOut] = useState(false);

    const [target, setTarget] = useState('Golden ticket');
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [isAnimText, setAnimText] = useState(false);
    const [infoText, setInfoText] = useState("Welcome to GolenTicket!")
    const [slotData, setSlotData] = useState([ // slot has 7 fruits
        // [0, 1, 2, 3, 4, 5, 6, 7],// number in fruits list
        // [0, 1, 2, 3, 4, 5, 6, 7],
        // [0, 1, 2, 3, 4, 5, 6, 7],
        [6, 3, 2, 7, 4, 0, 1, 5],
        [7, 1, 5, 3, 0, 6, 2, 4],
        [2, 4, 6, 5, 3, 1, 7, 0]

    ])
    const [initialY, setInitialY] = useState([posY, posY, posY]);
    // let initialY = [0, 0, 0];
    const [playerData, setPlayerData]: any = useState({
        spin_no: 0,
        spins: 0,
        coins: 0,
        shield: 0,
        golden_ticket_owned: false,
        golden_ticket_building: 'not yet',
        hasFrom: Date.now(),
        cardInfo: {}
    })

    const animations = useRef([
        new Animated.Value(initialY[0]),
        new Animated.Value(initialY[1]),
        new Animated.Value(initialY[2]),
    ]).current; // aniamtion for fruit

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;

    // Function to shuffle an array
    const shuffleArray = (array: any) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...

        // while (0 !== currentIndex) {
        //     // Pick a remaining element...
        //     // randomIndex = Math.floor(Math.random() * currentIndex);
        //     randomIndex = Math.ceil(Math.random() * (fruitCount - 1));
        //     currentIndex -= 1;

        //     // And swap it with the current element.
        //     temporaryValue = array[currentIndex];
        //     array[currentIndex] = array[randomIndex];
        //     array[randomIndex] = temporaryValue;
        // }

        return array;
    };

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

        const newSlotData = slotData.map(subArray => shuffleArray([...subArray]));
        setSlotData(newSlotData);

        fetchUserData();

        return () => {
            isMounted = false;
        };

    }, [user]);

    useEffect(() => {

        fadeAnim.setValue(0);
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }
        ).start();

        // Scale animation
        scaleAnim.setValue(0);
        Animated.timing(
            scaleAnim,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.elastic(2),
                useNativeDriver: true,
            }
        ).start();

    }, [isAnimText]);

    const handleSpinResult = async (machineStatus: any) => {
        setInfoText('Welcome to Golden Ticket');

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
        
        const indicatorText = ((spinPlus > 0) ? `Spins: +${spinPlus}` : '') + ((coinPlus > 0) ? `Coins: +${coinPlus}` : '') ;
        setInfoText(indicatorText);

        if (bets['Shield'] == 3) {// protect from attackers
            shieldPlus += 3;

            // Update infomation
            setInfoText(`You won Shield`);
            setAnimText(!isAnimText);

        }
        if (bets['Golden ticket'] == 3) {// gives a chance to steal the ticket
            // Update infomation
            setInfoText(`You won Golden ticket`);
            setAnimText(!isAnimText);

            // setTarget('Golden ticket');
            // setVisibleMap(true);
            openMapDailog('Golden ticket');

            setIsCelebrating(true);
            setTimeout(() => setIsCelebrating(false), 1000);

        }

        if (bets['Thief'] == 3) {// gives a chance to steal coins
            // Update infomation
            setInfoText(`You won Thief`);
            setAnimText(!isAnimText);

            // setTarget('Coin');
            // setVisibleMap(true);
            openMapDailog('Coin');
        }
        if (bets['More spins'] == 3) {// gives more spin
            // Update infomation
            setInfoText(`You won More spins`);
            setAnimText(!isAnimText);

            spinPlus += 200;
        }

        if (bets['Question mark'] == 3) {// gives more spin
            // Update infomation
            setInfoText(`You won Random`);
            setAnimText(!isAnimText);

            spinPlus += Math.ceil(Math.random() * 10) * 50;
            coinPlus += Math.ceil(Math.random() * 10) * 500;
        }

        // // Update infomation
        // setInfoText(`Got ${spinPlus} Spins and ${coinPlus} Coins`);
        setAnimText(!isAnimText);

        // save result
        const newData = {
            // spin_no: Math.min(playerData.spin_no + 1, playerData.spins),
            coins: playerData.coins + coinPlus,
            spins: playerData.spins - 1 + spinPlus,
            shield: playerData.shield + shieldPlus,
        }
        console.log(newData);
        updateUser(user?.email, newData)
            .then(() => {
                // console.log('User updated successfully');
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
        if(playerData.spins === 0) {
            console.log('spins are out at the moment, pls buy to use')
            setVisibleSpinsOut(true);
            return;
        }
        setSpinning(true);

        // Randomize the stopping point for each slot
        const slotStatus: any = {};
        // console.log(initialY);
        const currentSlotY = [0, 0, 0];
        animations.forEach((anim, index) => {
            anim.setValue(initialY[index]);

            const randomNumber = Math.ceil(Math.random() * (fruitCount - 4)) + 3;
            // const randomNumber = 2;
            const finalPosition = initialY[index] + randomNumber * fruitHeight;

            currentSlotY[index] = finalPosition;
            if (finalPosition >= -(fruitCount - 3 + 1) * fruitHeight) {
                currentSlotY[index] = finalPosition - fruitCount * fruitHeight;
            }
            // console.log("finalPosition", finalPosition, initialY[index], randomNumber);

            slotStatus[`slot${index}`] = (-currentSlotY[index] / fruitHeight + 1) % fruitCount;
            Animated.timing(anim, {
                toValue: finalPosition,
                duration: 500,// + (index * 200),
                easing: Easing.elastic(0.5),
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
            if (params.golden_ticket_owned) {//  && (params.golden_ticket_building == params.selectedBuilding)
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
    const getOwnedDays = (hasFrom: number) => {
        let result = 0;
        const currentTimestamp = Date.now();
        // Add 30 days in milliseconds
        const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;
        const hasFromPlus30Days = hasFrom + thirtyDaysInMillis;
        const differenceInMilliseconds = hasFromPlus30Days - currentTimestamp;
        result = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        return `${result} days`;
    }
    const openMapDailog = (target: string) => {
        setTarget(target);
        setVisibleMap(true);
    }
    const onSelectBox = async (params: any) => { // get card bought
        console.log('selected box', params);

        setPlayerData({
            ...playerData,
            coins: playerData.coins - params.boxCost,
            cardInfo: {
                ...playerData.cardInfo,
                [params.key]: params.count
            }
        });
        updateUser(user?.email, {
            coins: playerData.coins - params.boxCost,
            cardInfo: {
                ...playerData.cardInfo,
                [params.key]: params.count
            }
        })
            .then(() => {
                console.log('User updated successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const onSelectCard = async (params: any) => {
        console.log('used this card', params);
        const updatedPlayerData = {
            ...playerData,
            cardInfo: {
                ...playerData.cardInfo,
                [params.key]: playerData.cardInfo[params.key] - 1
            }
        }
        if (params.key == "steal_ticket") {
            openMapDailog('Golden ticket');
        }
        if (params.key == "steal_coin") {
            openMapDailog('Coin');
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

        setPlayerData(updatedPlayerData);
        updateUser(user?.email, updatedPlayerData)
            .then(() => {
                console.log('User updated successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameDetail}>
                <View style={styles.inventory}>
                    <ImageBackground style={styles.coinBar} source={ImageCoinBack as ImageSourcePropType} resizeMode="contain">
                        <Text style={styles.valueText}>{`${playerData.coins}`}</Text>
                    </ImageBackground>
                    <View style={styles.inventoryImage}>
                        {
                            playerData.golden_ticket_owned ? (
                                < ImageBackground source={ImageGoldenTicket as ImageSourcePropType} style={styles.smallImage} resizeMode='contain' />
                            ) : (
                                < ImageBackground source={ImageGoldenTicketBlank as ImageSourcePropType} style={styles.smallImage} resizeMode='contain' />
                            )
                        }
                    </View>
                    <View style={styles.inventoryImage}>
                        {
                            playerData.shield > 0 ? (
                                <Image source={ImageShield as ImageSourcePropType} style={styles.smallImage} />
                            ) : (
                                <Image source={ImageShieldBlank as ImageSourcePropType} style={styles.smallImage} />
                            )
                        }
                    </View>
                </View>
                <View style={styles.inventory}>
                    <ImageBackground style={styles.timerBar} source={ImageTimerBack as ImageSourcePropType} resizeMode="contain">
                        <Text style={styles.valueText}>{playerData.golden_ticket_owned ? getOwnedDays(playerData.hasFrom) : ''}</Text>
                    </ImageBackground>
                </View>
            </View>
            <ImageBackground style={styles.machine} source={ImageMachine as ImageSourcePropType} resizeMode="stretch" >
                <View style={styles.slotsContainer} >
                    {animations.map((anim, index) => (
                        <Animated.View key={index} style={[styles.slot, { transform: [{ translateY: anim }] }]}>
                            {slotData[index].map((fruitNo, fruitIndex) => (
                                <View style={styles.imageContainer} key={fruitIndex}>
                                    <Image source={fruitList[fruitNo].image} style={styles.fruitImage} />
                                </View>
                            ))}
                            {slotData[index].map((fruitNo, fruitIndex) => (
                                <View style={styles.imageContainer} key={fruitList.length + fruitIndex} >
                                    <Image source={fruitList[fruitNo].image} style={styles.fruitImage} />
                                </View>
                            ))}
                        </Animated.View>
                    ))}
                </View>
            </ImageBackground>

            <View style={{ position: 'absolute', top: 120 }}>
                <Image source={ImageLogoText as ImageSourcePropType} style={styles.logoImage} />
            </View>
            <View style={styles.infoPanel}>
                <Animated.Text
                    style={[styles.infoText,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }]}>
                    {infoText}
                </Animated.Text>
            </View>

            <ImageBackground style={styles.spinBar} source={ImageSpinBack as ImageSourcePropType} resizeMode="contain">
                <Text style={styles.valueText}>{`${playerData.spins}`}</Text>
            </ImageBackground>

            <GameButton background={ImageSpin} title={"SPIN"} onPress={spin} disabled={spinning} style={{ width: 300, height: 100 }} />

            <View style={{ position: 'absolute', top: 30, right: 10 }}>
                <GameButton background={ImageShop} title={"SHOP"} onPress={() => setVisible(true)} disabled={spinning} />
            </View>
            <View style={{ position: 'absolute', top: 85, right: 10 }}>
                <GameButton background={ImageBonus} title={"BONUS"} onPress={() => setVisibleInvite(true)} disabled={spinning} />
            </View>
            <View style={{ position: 'absolute', top: 85, right: 70 }}>
                <GameButton background={ImageMyVillage} title={"Village"} onPress={() => setVisibleVillage(true)} disabled={spinning} />
            </View>

            {/* <ImageButton title={"SPIN"} onPress={spin} disabled={spinning} /> */}
            {/* <View style={{ position: 'absolute', top: 0, right: 0 }}> */}
            {/* <ImageButton title={"SHOP"} onPress={() => setVisible(true)} disabled={spinning} style={{ marginTop: 10, }} /> */}
            {/* </View> */}
            {/* <ImageButton title={"BONUS"} onPress={() => setVisibleInvite(true)} disabled={spinning} style={{ marginTop: 10, }} /> */}
            {/* <ImageButton title={"BACK"} onPress={() => navigation.navigate('Home')} disabled={spinning} style={{ marginTop: 10, }} /> */}


            <ShopDialog isOpen={isVisible} onOK={(params: any) => onBuyCoinSpin(params)} onCancel={() => setVisible(false)} />
            <SpinsOutDialog isOpen={isVisibleSpinsOut} onOK={() => setVisible(true)} onCancel={() => setVisibleSpinsOut(false)} />
            <InviteDialog isOpen={isVisibleInvite} onOK={(params: any) => onInvite(params)} onCancel={() => setVisibleInvite(false)} />
            {/* <MyVillageDialog isOpen={isGolenTicket} onOK={(params: any) => onGoldenTicket(params)} onCancel={() => setGoldenTicket(false)} /> */}
            {/* <MyVillageDialog
                isOpen={isVisibleVillage}
                machineData={playerData}
                onSelectBox={onSelectBox}
                onSelectCard={onSelectCard}
                onOK={(params: any) => { }}
                onCancel={() => setVisibleVillage(false)}
            /> */}

            <MyCardsDialog
                isOpen={isVisibleVillage}
                machineData={playerData}
                onSelectBox={onSelectBox}
                onSelectCard={onSelectCard}
                onOK={(params: any) => { }}
                onCancel={() => setVisibleVillage(false)}
            />

            <MapDialog isOpen={isVisibleMap} email={user?.email} target={target} onOK={(params: any) => onMap(params)} onCancel={() => setVisibleMap(false)} />

            {isCelebrating && <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
        marginTop: 35,
    },
    slot: {
        width: 100,
    },
    imageContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: '#fed49a',
        // borderWidth: 1,
    },
    fruitImage: {
        width: 64,
        height: 64,
        marginVertical: 0,
        // borderColor: '#fed49a',
        // borderWidth: 1,
        // resizeMode: 'contain', 
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        // backgroundColor: '#410577',
        // borderRadius: 5,
        // borderWidth: 2,
        // borderColor: '#fff',
        marginTop: 30,
        marginBottom: 25,
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textGroup: {
        width: "100%",
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
        fontWeight: '700',
        color: '#410577',
        paddingHorizontal: 5,
        fontFamily: 'Roboto'
    },
    inventory: {
        // flex: 1,
        // width: "50%",
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 1,
    },
    smallImage: {
        width: 50,
        height: 50,
        marginVertical: 0,
        // borderColor: '#fed49a',
        // borderWidth: 1,
        marginRight: 5,
        // resizeMode: 'contain',
    },
    infoPanel: {
        position: 'absolute',
        top: 160,
        // right: -40,
        width: '100%',
        marginBottom: 20,
        // backgroundColor: '#2C3E50',
        // borderRadius: 5,
        // borderWidth: 2,
        borderColor: '#fff',
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#410577', // '#FFD700',
    },
    inventoryImage: {
        width: 50,
        height: 50,
        // padding: 5,
        // borderWidth: 1,
        // borderColor: '#CCC',
    },
    coinBar: {
        width: 200,
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerBar: {
        width: 170,
        height: 60,
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinBar: {
        width: 200,
        height: 80,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: 300,
        height: 70,
    }
});

export default FruitMachine;
