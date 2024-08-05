import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageSourcePropType, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import ColorBlock from '../custom/ColorBlock';
import { CARDS } from '../../constants';
import { getUser, updateUser } from '../../services/gameService';
import { UserContext } from '../../App';
import ImageBox from '../../../static/assets/others/chest.jpg';
import ResultDialog from '../dialogs/ResultDialog';

interface StealProps {
    targetId?: string;
    targetItem?: string;
}

const Steal: React.FC<StealProps> = ({ targetId, targetItem }) => {

    const user = useContext(UserContext);
    const [playerData, setPlayerData]: any = useState({});
    const [targetUser, setTargetUser]: any = useState({});
    const [cards, setCards] = useState([
        {
            id: '1',
            percent: 20,
        },
        {
            id: '2',
            percent: 10,
        },
        {
            id: '3',
            percent: 5,
        },
        {
            id: 'x',
            percent: 0,
        }
    ]);
    const [boxs, setBoxs] = useState([
        ...cards
    ]);
    const [count, setCount] = useState(0);// max count is 5
    const [clickable, setClickable] = useState(true);
    const [visibleNumber, setVisibleNumber] = useState(false);
    const [isVisibleResult, setVisibleResult] = useState(false);
    const [resultData, setResultData] = useState([
        {
            name: 'Coin',
            description: 'You can use coin to buy cards',
            amount: 34500,
        }
    ]);

    useEffect(() => {
        let isMounted = true;

        const shuffled = shuffleArray(cards);
        setCards(shuffled);

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
                const targetUser: any = await getUser(targetId);
                if (isMounted) {
                    if (targetUser) {
                        console.log('User found:', targetUser);
                        setTargetUser(targetUser);
                    } else {
                        console.log('targetUser not found');
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
        // if (!playerData.cardInfo) { return }
        // const updatedCards: any = CARDS.filter((item: any) => item.key.includes('block') && !item.key.includes('steal')).map((card: any) => {
        //     return {
        //         ...card,
        //         count: playerData.cardInfo[card.key] || 0
        //     }

        // });
        // setCards(updatedCards);
    }, [playerData]);
    const shuffleArray = (array: any) => {
        // Create a copy of the array to avoid mutating the original array
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 1; i--) {
            const j = Math.floor(Math.random() * shuffledArray.length);
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    const onSelectCard = async (params: any) => {

        console.log('selected this card', params);
        if (!clickable) {
            console.log("Unable click");
            setVisibleNumber(true);
            return;
        }
       

        setVisibleNumber(true);
        if (params.id == 'x') {
            setClickable(false);
            // setVisibleNumber(true);
            return;
        }
        
        setTimeout(() => {
            setVisibleNumber(false);
            const shuffled = shuffleArray(cards);
            setCards(shuffled);
        }, 1000);

        ///////////////////////////////////////////////
        const targetData: any = await getUser(targetId);
        const userData: any = await getUser(user?.email);

        const stealAmount = Math.round(targetData?.coins * params.percent / 100 / 100) * 100;

        // await updateUser(user?.email, {
        //     coins: userData.coins + stealAmount,
        // });

        // await updateUser(targetId, {
        //     coins: targetData.coins - stealAmount,
        // });

        setPlayerData({
            ...userData,
            coins: userData.coins + stealAmount,
        });
        setResultData([
            {
                name: 'Coin',
                description: 'You stole the coins',
                amount: stealAmount,
            }
        ]);
        setVisibleResult(true);
        /////////////////////////////////////////////
        const curCount = Math.min(5, count + 1)
        if (curCount >= 5) {
            console.log("max click");
            setClickable(false);
            return;
        }
        setCount(curCount);
    }
    const GridItem = ({ item }: any) => (
        <View style={styles.gridItem}>
            <TouchableOpacity key={item.title} style={styles.coinItem} onPress={() => onSelectCard(item)}>
                <ImageBackground source={item.image} style={styles.spinImage} >
                    <Text style={styles.price}>{visibleNumber ? item.id : `?`}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
    const BoxItem = ({ item }: any) => (
        <View style={styles.gridItem}>
            <TouchableOpacity key={item.title} style={styles.coinItem} >
                <ImageBackground source={ImageBox as ImageSourcePropType} style={styles.spinImage} >
                    <Text style={styles.price}>{`${item.id} (${item.percent}%)`}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.towerContainer, { width: '100%' }]}>
                <Text style={styles.username}>{targetUser?.username || "Unknown User"}</Text>
                <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        boxs.filter((item: any) => item.id != 'x').map((item: any) => (
                            <BoxItem key={item.id} item={item} />
                        ))
                    }
                </View>
                {/* <Text style={styles.description} > You can choose a card. The cards are random order</Text> */}
            </ScrollView >
            <View style={styles.bottomContainer}>
                <Text style={styles.levelText} >You can choose a card. The cards are random order. If you choose 1, then it opens chest 1.</Text>
                <View style={styles.cards}>
                    {cards.map((item: any, index: number) => (
                        <GridItem key={index} item={item} />
                    ))}
                </View>
            </View>
            <ResultDialog isOpen={isVisibleResult} data={resultData} onCancel={() => setVisibleResult(false)} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    towerContainer: {
        // flexGrow: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        paddingVertical: 30,
        width: '100%',
        height: '100%',
    },
    containerColumn: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    background: {
        // width: '100%',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3,
    },

    coinIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    coinText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    bottomContainer: {
        width: '100%',
    },
    levelText: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#f80',
        paddingVertical: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    gridItem: {
        flex: 1,
        margin: 10,
        backgroundColor: '#444',
        // borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        padding: 5,
    },
    image: {
        width: '100%',
        height: 100,
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
    spinImage: {
        width: 150,
        height: 200,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    price: {
        color: '#333',
        fontSize: 28,
        fontWeight: 'bold',
        // paddingBottom: 10,
        // backgroundColor: '#080',
        paddingHorizontal: 10,
        borderRadius: 3,
        textAlign: 'center',
    },
    username: {
        color: '#ff0',
        fontSize: 36,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        borderRadius: 3,
        textAlign: 'center',
    },
    description: {
        color: '#0f3',
        fontSize: 24,
        fontWeight: '500',
        paddingHorizontal: 10,
    }
});

export default Steal;
