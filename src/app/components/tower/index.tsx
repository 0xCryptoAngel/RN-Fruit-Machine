import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageSourcePropType, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import ColorBlock from '../custom/ColorBlock';
import { CARDS } from '../../constants';
import { getUser, updateUser } from '../../services/gameService';
import { UserContext } from '../../App';

interface TowerProps {
    level?: any;
    blocks?: any;
    backgroundImage?: any;
}

const Tower: React.FC<TowerProps> = ({ level, blocks, backgroundImage }) => {

    const user = useContext(UserContext);

    const screnWidth = Dimensions.get('window').width;
    const totalBlock = 40 * 10;
    const [size, setSize] = useState({ // block size
        width: 70,
        height: 70
    });
    const [columns, setColumns] = useState(1);
    const [scale, setScale] = useState(1);
    const [playerData, setPlayerData]: any = useState({});
    const [cards, setCards] = useState([]);

    const blockArr: number[] = Array(playerData?.level * 10 / scale || 10).fill(0).map((_, i) => i);

    useEffect(() => {
        if(!playerData?.level) { return }

        if (playerData?.level <= 5) {
            setScale(1);
            setColumns(playerData?.level)
        } else {
            setScale(10);
            setColumns(Math.ceil(playerData?.level / 10))
        }

    }, [playerData?.level])
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
        const updatedCards: any = CARDS.filter((item: any) => item.key.includes('block') && !item.key.includes('steal')).map((card: any) => {
            return {
                ...card,
                count: playerData.cardInfo[card.key] || 0
            }

        });
        setCards(updatedCards);
    }, [playerData]);
    const onUseCard = async (params: any) => {

        console.log('used this card', params);
        if(params.count <=0 ) {
            return;
        }
        const updatedPlayerData = {
            ...playerData,
            cardInfo: {
                ...playerData.cardInfo,
                [params.key]: playerData.cardInfo[params.key] - 1
            }
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.towerContainer, { width: columns * (size.width + 2) }]}>
                {blockArr.map((item, index) => index < playerData?.block / scale ? (
                    <ColorBlock key={index} level={playerData?.level} text={(index + 1) * scale} color={`rgba(255, 0, 0, 0.5)`} style={{ ...size }} />
                ) : (
                    <ColorBlock key={index} level={''} text={''} style={{ ...size }} />
                ))}
            </ScrollView >
            <View style={styles.bottomContainer}>
                <Text style={styles.levelText} >{`${playerData?.block || '0'}/${(playerData?.level || 0) * 10}`}</Text>
                <View style={styles.cards}>
                    {cards.map((item: any, index: number) => (
                        <GridItem key={index} item={item} />
                    ))}
                </View>
            </View>
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
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        paddingVertical: 10,
        // width: '80%',
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
        backgroundColor: '#ccc',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    price: {
        color: '#333',
        fontSize: 18,
        fontWeight: '600',
        // paddingBottom: 10,
        backgroundColor: '#0f0',
        paddingHorizontal: 10,
        borderRadius: 10,
        textAlign: 'center',
    },
});

export default Tower;
