import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground, ScrollView, Dimensions } from 'react-native';

import AnimatedCounter from '../animation/AnimatedCounter';

import ImageBuildingEnchanted from '../../../static/assets/castles/castles_magic.png';
import ImageBuildingProtection from '../../../static/assets/castles/castles_defence.png';
import ImageBuildingResource from '../../../static/assets/castles/castles_resource.png';
import ImageBuildingAttack from '../../../static/assets/castles/castles_attack.png';

import ImageBoxEnchanted from '../../../static/assets/box1.jpg';
import ImageBoxProtection from '../../../static/assets/box2.jpg';
import ImageBoxResource from '../../../static/assets/box3.jpg';
import ImageBoxAttack from '../../../static/assets/box4.jpg';

import ImageCardCoin200k from '../../../static/assets/card_200k_coins.png';
import ImageCardCoin2x from '../../../static/assets/card_coin_multi_x2.png';
import ImageCardShield from '../../../static/assets/card_shield.png';
import ImageCardShield2x from '../../../static/assets/card_shield_x2.png';
import ImageCardShield3x from '../../../static/assets/card_shield_x3.png';
import ImageCardStealCoin from '../../../static/assets/card_steal_coin.png';
import ImageCardStealTicket from '../../../static/assets/card_steal_ticket.png';
import ImageCardStealBlock from '../../../static/assets/card_steal_block.png';
import ImageCardTimekeeper from '../../../static/assets/card_time_keeper.png';
import ImageCardTimekeeper5 from '../../../static/assets/card_timekeeper5.png';
import ImageCardStealXtraSpin10 from '../../../static/assets/card_xtra_spin_10.png';
import ImageCardStealXtraSpin20 from '../../../static/assets/card_xtra_spins_20.png';
import ImageCardStealXtraSpin30 from '../../../static/assets/card_xtra_spins_30.png';
import ImageCardStealXtraSpin40 from '../../../static/assets/card_xtra_spins_40.png';
import ImageCardStealXtraSpin100 from '../../../static/assets/card_xtra_spins_100.png';
import ImageCardBlock1 from '../../../static/assets/1_tower_blocks.png';
import ImageCardBlock2 from '../../../static/assets/2_tower_blocks.png';
import ImageCardBlock3 from '../../../static/assets/3_tower_blocks.png';
import ImageCardBlock4 from '../../../static/assets/4_tower_blocks.png';

import BackArrowImg from '../../../static/assets/back_arrow_button.png';

import ImageCardLibrary from '../../../static/assets/castle_back_ground.png';
import ImageCastleBackground from '../../../static/assets/castle_bg_crop.png';
import ImageCollectionBackground from '../../../static/assets/colletions_bg_crop.png';
import ImageCoinBack from '../../../static/assets/coin-bar.png';

import { ImageButton, BuyButton } from '../buttons';
import { Divider } from '../dividers';

const MyCardsDialog = ({ isOpen, machineData, onOK, onCancel, onSelectBox, onSelectCard }: any) => {

    const width = Dimensions.get('window').width;
    const buildings = [
        {
            type: 'building',
            title: 'Enchanted',
            value: 'building1',
            image: ImageBuildingEnchanted,
            boxCost: (machineData.level || 1) * 1000, // 3000
            // boxImage: ImageBoxEnchanted,
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
            // boxImage: ImageBoxProtection,
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
            // boxImage: ImageBoxResource,
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
            // boxImage: ImageBoxAttack,
            cards: [
                'steal_coin',
                'steal_block',
                // 'steal_ticket',
            ]
        },

    ]
    const [cards, setCards]: any = useState([
        {
            key: 'steal_ticket',
            name: 'Steal Ticket',
            image: ImageCardStealTicket,
            count: 0,
        },
        {
            key: 'steal_coin',
            name: 'Steal Coin',
            image: ImageCardStealCoin,
            count: 0,
        },
        {
            key: 'steal_block',
            name: 'Steal Block',
            image: ImageCardStealBlock,
            count: 0,
        },
        // {
        // key: steal_time_keeper,
        //     name: 'Time Keeper',
        //     image: ImageCardTimekeeper,
        // count: 0,
        // },
        {
            key: 'time_keeper5',
            name: 'Time Keeper',
            image: ImageCardTimekeeper5,
            count: 0,
        },
        {
            key: 'shield',
            name: 'Shield',
            image: ImageCardShield,
            count: 0,
        },
        {
            key: 'shield_2x',
            name: 'Shield 2x',
            image: ImageCardShield2x,
            count: 0,
        },
        {
            key: 'shield_3x',
            name: 'Shield 3x',
            image: ImageCardShield3x,
            count: 0,
        },
        {
            key: 'coin_200k',
            name: 'Coin 200k',
            image: ImageCardCoin200k,
            count: 0,
        },
        {
            key: 'coin_2x',
            name: 'Coin 2x',
            image: ImageCardCoin2x,
            count: 0,
        },
        {
            key: 'extra_spins_10',
            name: 'Extra Spins 10',
            image: ImageCardStealXtraSpin10,
            count: 0,
        },
        {
            key: 'extra_spins_20',
            name: 'Extra Spine 20',
            image: ImageCardStealXtraSpin20,
            count: 0,
        },
        {
            key: 'extra_spins_30',
            name: 'Extra Spine 30',
            image: ImageCardStealXtraSpin30,
            count: 0,
        },
        {
            key: 'extra_spins_40',
            name: 'Extra Spine 40',
            image: ImageCardStealXtraSpin40,
            count: 0,
        },
        // {
        // key: 'extra_spins_100',
        //     name: 'Extra Spine 100',
        //     image: ImageCardStealXtraSpin100,
        // count: 0,
        // },
        {
            key: 'block',
            name: 'Blocks for Level',
            image: ImageCardBlock1,
            count: 0,
        },
        {
            key: 'block2',
            name: '2 Blocks for Level',
            image: ImageCardBlock2,
            count: 0,
        },
        {
            key: 'block3',
            name: '3 Blocks for Level',
            image: ImageCardBlock3,
            count: 0,
        },
        {
            key: 'block4',
            name: '4 Blocks for Level',
            image: ImageCardBlock4,
            count: 0,
        },
    ])
    const [selectedCards, setSelectedCards]: any = useState([]);
    const [formData, setFormData]: any = useState({
        selectedBuilding: {},
    });
    const handleSelectBuilding = async (params: any) => {
        console.log(params);

        setFormData({
            ...formData,
            selectedBuilding: params, //.value
        });

        // onOK(params);
        const filteredCards = params.cards.map((item: any) => {
            const card = cards.find((it: any) => it.key == item);
            if (card) { return card }
        });
        setSelectedCards(filteredCards);
    }
    const handleSelectBox = async (params: any) => { // Buy card
        console.log('selected box -->', params);
        if (machineData.coins < params.boxCost) {
            console.log('nagative balcance');
            return;
        }

        const cardLength = params.cards?.length;
        if (cardLength == 0) { return; }
        const index = Math.floor(Math.random() * cardLength);
        const cardKey = params.cards[index];
        const updatedCards = cards.map((card: any) => {
            return {
                ...card,
                count: card.key == cardKey ? card.count + 1 : card.count
            }
        })
        setCards(updatedCards);
        setSelectedCards([...selectedCards]);

        // update select item when click buy button

        const selectedCard = updatedCards.find((item: any) => item.key == cardKey);
        console.log(cardKey, selectedCard);
        onSelectBox({
            boxCost: params.boxCost,
            ...selectedCard
        });

        handleSelectBuilding(params);

    }
    const handleSelectCard = async (params: any) => { // Buy card
        console.log('selected card', params);
        if (params.count == 0) {
            console.log('card count is 0');
            return;
        }

        const cardKey = params.key;
        const updatedCards = cards.map((card: any) => {
            return {
                ...card,
                count: card.key == cardKey ? card.count - 1 : card.count
            }
        })
        setCards(updatedCards);

        onSelectCard({
            ...params,
        })
    }

    useEffect(() => {
        const updateCards = cards.map((card: any) => {
            return {
                ...card,
                count: machineData.cardInfo ? machineData.cardInfo[card.key] || 0 : 0,
            }
        });
        setCards(updateCards);

        if (formData.selectedBuilding?.cards) {
            const filteredCards = formData.selectedBuilding.cards.map((item: any) => {
                const card = updateCards.find((it: any) => it.key == item);
                if (card) { return card }
            });
            setSelectedCards(filteredCards);
        }


    }, [machineData])

    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <View style={styles.modalView}>
                <View style={styles.alert}>
                    <ImageBackground source={ImageCardLibrary as ImageSourcePropType} style={styles.imageBackground} resizeMode='cover'>
                        <TouchableOpacity style={styles.backArrowButton} onPress={() => onCancel()}>
                            <ImageBackground source={BackArrowImg as ImageSourcePropType} style={styles.backArrowImage} resizeMode='cover' />
                        </TouchableOpacity>
                        <ImageBackground source={ImageCastleBackground as ImageSourcePropType} style={styles.imageCastleBackground} resizeMode='cover'>
                            {/* <Text style={styles.alertMessage}>{`${machineData.coins} coins now`}</Text> */}
                            <ImageBackground style={styles.coinBar} source={ImageCoinBack as ImageSourcePropType} resizeMode="contain">
                                <Text style={styles.valueText}>{`${machineData.coins}`}</Text>
                            </ImageBackground>
                            <View style={styles.buildings}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                    {
                                        buildings.map((item: any, index: number) => (
                                            <View key={index} style={styles.building}>
                                                <TouchableOpacity key={index} style={styles.building} onPress={() => handleSelectBuilding(item)}>
                                                    <ImageBackground source={item.image} style={styles.buildingImage} resizeMode='contain' />
                                                    <Text style={{
                                                        marginVertical: 1,
                                                        textAlign: 'center',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        color: item.value == formData.selectedBuilding.value ? '#008' : "#333"
                                                    }}> {`${item.title} : ${item?.boxCost}`}</Text>
                                                </TouchableOpacity>
                                                <BuyButton onPress={() => handleSelectBox(item)} />
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        </ImageBackground>

                        <ImageBackground source={ImageCollectionBackground as ImageSourcePropType} style={styles.imageCollectionBackground} resizeMode='cover'>
                            <View style={styles.cards}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {
                                        selectedCards.map((card: any) => (
                                            <TouchableOpacity key={card.name} style={styles.card} onPress={() => handleSelectCard(card)}>
                                                <ImageBackground source={card.image as ImageSourcePropType} style={styles.cardImage} resizeMode='contain' >
                                                    <View style={{ paddingVertical: 10 }}>
                                                        <AnimatedCounter targetValue={card.count} duration={500} />
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    </>)
}

export default MyCardsDialog;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    modalContainer: {
        // backgroundColor: "transparent",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageBackground: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        // paddingTop: '25%',
    },
    modalView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    alert: {
        flex: 1,
        width: '100%',
        // maxWidth: 300,
        height: '100%',
        marginTop: 0,
        paddingHorizontal: 0,
        elevation: 24,
        borderRadius: 2,
        backgroundColor: '#fff'
    },
    alertTitle: {
        marginHorizontal: 24,
        fontWeight: "bold",
        fontSize: 24,
        color: "#000"
    },
    alertMessage: {
        marginTop: 60,
        // marginTop: 70,
        marginRight: 24,
        marginBottom: 5,// 24
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#f40",
        textAlign: 'center'
    },
    alertButtonGroup: {
        marginTop: 0,
        marginRight: 0,
        // marginBottom: 8,
        marginLeft: 4,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    alertButton: {
        marginTop: 8,
        marginRight: 8
    },
    alertIcon: {
        width: 100,
        height: 100,
        left: '50%',
        top: -20,
        transform: [{ translateX: -50 }],
        borderRadius: 50,
    },
    buySpins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    spinItem: {

    },
    spinImage: {
        width: 150,
        height: 150,
    },
    backArrowButton: {
        position: 'absolute',
        right: 5,
        top: 6,
        width: 40,
        height: 40,
        zIndex: 100,
    },
    backArrowImage: {
        width: 40,
        height: 40,
    },
    buyCoins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    coinItem: {

    },
    coinImage: {
        width: 100,
        height: 150,
    },
    buildings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'center',
        // flexWrap: 'wrap',
        // marginTop: '40%',
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    building: {
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    buildingImage: {
        width: 180, // 64
        height: 230,
    },
    cards: {
        marginTop: '20%', // 30
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 20,

    },
    card: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImage: {
        width: 150,
        height: 250,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cardCountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f20'
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {

    },

    boxImage: {
        width: 128,
        height: 128,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTextHeader: {
        paddingHorizontal: 10,
        fontSize: 24,
        color: '#0f8',
        fontWeight: 'bold'
    },
    boxText: {
        paddingHorizontal: 10,
        fontSize: 22,
        color: '#f80',
        fontWeight: 'bold'
    },
    imageCastleBackground: {
        marginTop: 0,
        resizeMode: 'contain',
        width: '100%',
        // height: '100%',
        // paddingTop: '25%',
    },
    imageCollectionBackground: {
        // resizeMode: 'cover',
        width: '100%',
        // height: '120%',
        height: 330,
        // paddingTop: '25%',
    },
    coinBar: {
        marginTop: 60,
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#410577',
        paddingHorizontal: 5,
        fontFamily: 'Roboto'
    },
});

