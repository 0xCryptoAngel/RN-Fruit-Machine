import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Button, Text } from 'react-native';
import AnimatedCounter from './AnimatedCounter';
import { ImageButton } from '../buttons';
import { ImageText, CoinText } from '../text';
// Replace these with your actual fruit images
const FRUIT_IMAGES = [
    require('../../../static/assets/fruit-1.png'),
    require('../../../static/assets/fruit-2.png'),
    require('../../../static/assets/fruit-3.png'),
    require('../../../static/assets/fruit-4.png'),
    require('../../../static/assets/fruit-3.png'),
    require('../../../static/assets/fruit-2.png'),
    require('../../../static/assets/fruit-1.png'),
];

const totalHeight = FRUIT_IMAGES.length * 100;
const initialY = 0;
const fruitWidth = 100, fruitHeight = 100, fruitCount = 7;

const numberToName: any = {
    0: 'Shield', // - protects from attackers
    1: 'Golden ticket', // - gives a chance to steal the ticket.
    2: 'Thief',// gives a chance to steal coins
    3: 'More spins', // - gives more spin.
    4: 'Chocolate', // - 1 = 1200, 2 = 3000, 3 = 10000
    5: 'Bag of chocolates', // 1 = 2500, 2 = 8000, 3 = 20000
    6: 'Hat', // 1 = 5000, 2 = 10000, 3 = 75000
    7: 'Question mark', // = random win
}

const FruitMachine = () => {
    const [spinning, setSpinning] = useState(false);
    const [slotMachine, setSlotMachine]: any = useState({
        slot0: 0,
        slot1: 0,
        slot2: 0,
    });
    const [playerData, setPlayerData] = useState({
        spinCount: 50,
        currentSpin: 5,
        coins: 2123,
    })

    const animations = useRef([
        new Animated.Value(initialY),
        new Animated.Value(initialY),
        new Animated.Value(initialY),
    ]).current;

    // useEffect(() => {
    //     console.log(`machine status: ${numberToName[slotMachine.slot0]} ${numberToName[slotMachine.slot1]} ${numberToName[slotMachine.slot2]}`)
    // }, slotMachine);
    const handleSpinResult = async (machineStatus: any) => {
        console.log(`fruit names: ${numberToName[machineStatus.slot0]} ${numberToName[machineStatus.slot1]} ${numberToName[machineStatus.slot2]}`)
        setPlayerData({
            ...playerData,
            currentSpin: Math.min(playerData.currentSpin + 1, playerData.spinCount)
        })
    }
    const spin = () => {
        setSpinning(true);

        // Randomize the stopping point for each slot
        const slotStatus: any = {};
        animations.forEach((anim, index) => {
            anim.setValue(initialY);

            const randomNumber = Math.ceil(Math.random() * FRUIT_IMAGES.length);
            const randomSpin = randomNumber * fruitHeight;
            const finalPosition = -randomSpin;

            slotStatus[`slot${index}`] = (slotMachine[`slot${index}`] + randomNumber) % fruitCount;
            Animated.timing(anim, {
                toValue: finalPosition,
                duration: 500 + (index * 200),
                useNativeDriver: true,
            }).start(() => {
                if (index === animations.length - 1) {
                    setSpinning(false);
                    console.log('spin result', slotStatus);
                    setSlotMachine(slotStatus);
                    handleSpinResult(slotStatus);

                }
            });
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.slotsContainer}>
                {animations.map((anim, index) => (
                    <Animated.View key={index} style={[styles.slot, { transform: [{ translateY: anim }] }]}>
                        {FRUIT_IMAGES.map((imageSrc, fruitIndex) => (
                            <Image key={fruitIndex} source={imageSrc} style={styles.fruitImage} />
                        ))}
                        {FRUIT_IMAGES.map((imageSrc, fruitIndex) => (
                            <Image key={FRUIT_IMAGES.length + fruitIndex} source={imageSrc} style={styles.fruitImage} />
                        ))}
                    </Animated.View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.counterContainer}>
                    <Text style={{ fontSize: 16, color: '#fff', paddingHorizontal: 5, fontFamily: 'Roboto' }}>{`Spins(${playerData.spinCount})`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AnimatedCounter targetValue={playerData.currentSpin} duration={5000} />
                    </View>
                </View>
                <View style={styles.coinContainer}>
                    <CoinText background={require('../../../static/assets/coin.jpg')} title={playerData.coins} />
                </View>
            </View>
            <ImageButton title={"SPIN"} onPress={spin} disabled={spinning} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
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
        // paddingVertical: 5,
        backgroundColor: '#410577',
        borderRadius: 5,
        // borderWidth: 2,
        // borderColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 10,
    }
});

export default FruitMachine;
