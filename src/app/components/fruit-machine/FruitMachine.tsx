import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Button, Text } from 'react-native';
import AnimatedCounter from './AnimatedCounter';
import { ImageButton } from '../buttons';
import { ImageText, CoinText } from '../text';
import { ShopDialog } from '../dialogs';

const initialY = 0;
const fruitWidth = 100, fruitHeight = 100, fruitCount = 8;
const totalHeight = fruitCount * fruitHeight;

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
    const [spinning, setSpinning] = useState(false);
    const [isVisible, setVisible] = useState(false);

    const [fruitMachine, setFruitMachine]: any = useState({ // has 3 slots
        slot0: 0,// current number in slot data
        slot1: 0,
        slot2: 0,
    });

    const [slotData, setSlotData] = useState([ // slot has 7 fruits
        [0, 1, 2, 3, 4, 5, 6, 7],// number in fruits list
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
    ])
    const [initialY, setInitialY] = useState([0, 0, 0]);
    // let initialY = [0, 0, 0];
    const [playerData, setPlayerData] = useState({
        spinCount: 50,
        currentSpin: 0,
        coinCount: 1000,
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
        // Generate new slot data with shuffled numbers
        const newSlotData = slotData.map(subArray => shuffleArray([...subArray]));
        // setSlotData(newSlotData);
    }, []);

    const handleSpinResult = async (machineStatus: any) => {
        console.log(machineStatus, slotData[0][machineStatus.slot0], slotData[1][machineStatus.slot1], slotData[2][machineStatus.slot2]);
        const fruitOfslot0 = slotData[0][machineStatus.slot0],
            fruitOfslot1 = slotData[1][machineStatus.slot1],
            fruitOfslot2 = slotData[2][machineStatus.slot2];
        const fruitData0 = fruitList[fruitOfslot0];
        const fruitData1 = fruitList[fruitOfslot1];
        const fruitData2 = fruitList[fruitOfslot2];

        console.log(fruitData0.name, fruitData1.name, fruitData2.name);

        setPlayerData({
            ...playerData,
            currentSpin: Math.min(playerData.currentSpin + 1, playerData.spinCount)
        })
    }
    const spin = () => {
        setSpinning(true);

        // Randomize the stopping point for each slot
        const slotStatus: any = {};
        console.log(initialY);
        const currentSlotY = [0, 0, 0];
        animations.forEach((anim, index) => {
            anim.setValue(initialY[index]);

            const randomNumber = Math.ceil(Math.random() * fruitCount);
            const randomSpin = randomNumber * fruitHeight;
            const finalPosition = -randomSpin;
            currentSlotY[index] = finalPosition;
            slotStatus[`slot${index}`] = (fruitMachine[`slot${index}`] + randomNumber) % fruitCount;
            Animated.timing(anim, {
                toValue: finalPosition,
                duration: 500 + (index * 200),
                useNativeDriver: true,
            }).start(() => {
                if (index === animations.length - 1) {
                    setSpinning(false);
                    setFruitMachine(slotStatus);
                    handleSpinResult(slotStatus);
                    setInitialY(currentSlotY);

                    console.log('spin result', slotStatus);
                }
            });
        });
    };

    const onBuyCoinSpin = async (params: any) => {
        console.log(params);
        setVisible(false);
        if (params.type == 'spin') {
            setPlayerData({
                ...playerData,
                spinCount: playerData.spinCount + params.value
            })
        }
        if (params.type == 'coin') {
            setPlayerData({
                ...playerData,
                coinCount: playerData.coinCount + params.value
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.slotsContainer}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={styles.counterContainer}>
                    <Text style={{ fontSize: 16, color: '#fff', paddingHorizontal: 5, fontFamily: 'Roboto' }}>{`Spins(${playerData.spinCount})`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AnimatedCounter targetValue={playerData.spinCount - playerData.currentSpin} duration={5000} />
                    </View>
                </View>
                <View style={styles.coinContainer}>
                    <CoinText background={require('../../../static/assets/coin.jpg')} title={playerData.coinCount} />
                </View>
            </View>
            <ImageButton title={"SPIN"} onPress={spin} disabled={spinning} />
            <ImageButton title={"SHOP"} onPress={() => setVisible(true)} disabled={spinning} style={{ marginTop: 20, }} />
            <ShopDialog isOpen={isVisible} onOK={(params: any) => onBuyCoinSpin(params)} onCancel={() => setVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderRadius: 4,
    },
    slotsContainer: {
        flexDirection: 'row',
        height: 300,
        overflow: 'hidden',
        marginVertical: 30,
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#78039a',
    },
    slot: {
        width: 100,
        // overflow: 'hidden', 
        // borderColor: '#999', 
        // borderWidth: 2,
    },
    fruitImage: {
        width: 100,
        height: 100,
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
    }
});

export default FruitMachine;
