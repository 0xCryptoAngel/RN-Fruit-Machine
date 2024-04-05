import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';
import AnimatedCounter from '../animation/AnimatedCounter';
import ImageBuildingEnchanted from '../../../static/assets/casltes1.png';
import ImageBuildingProtection from '../../../static/assets/casltes2.png';
import ImageBuildingResource from '../../../static/assets/casltes3.png';
import ImageBuildingAttack from '../../../static/assets/casltes4.png';

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
import ImageCardTimekeeper from '../../../static/assets/card_time_keeper.png';
import ImageCardTimekeeper5 from '../../../static/assets/card_timekeeper5.png';
import ImageCardStealXtraSpin10 from '../../../static/assets/card_xtra_spin_10.png';
import ImageCardStealXtraSpin20 from '../../../static/assets/card_xtra_spins_20.png';
import ImageCardStealXtraSpin30 from '../../../static/assets/card_xtra_spins_30.png';
import ImageCardStealXtraSpin40 from '../../../static/assets/card_xtra_spins_40.png';
import ImageCardStealXtraSpin100 from '../../../static/assets/card_xtra_spins_100.png';


import { ImageButton } from '../buttons';
import { Divider } from '../dividers';

const MyVillageDialog = ({ isOpen, machineData, onOK, onCancel, onSelectBox, onSelectCard }: any) => {

    const buildings = [
        {
            type: 'building',
            title: 'Enchanted',
            value: 'building1',
            image: ImageBuildingEnchanted,
            boxCost: 3000,
            cards: [
                'time_keeper5'
            ]
        },
        {
            type: 'building',
            title: 'Protection',
            value: 'building2',
            image: ImageBuildingProtection,
            boxCost: 4000,
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
            cards: [
                'steal_coin',
                'steal_ticket',
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
    ])
    const [formData, setFormData]: any = useState({
        selectedBuilding: {},
    });
    const handleSelectBuilding = async (params: any) => {
        console.log(params);
        setFormData({
            ...formData,
            selectedBuilding: params, //.value
        });
        onOK(params);
    }
    const handleSelectBox = async (params:any) => {
        console.log('selected box', params);
        if(machineData.coins < params.boxCost) { 
            console.log('nagative balcance');

            return;
        }
        const cardLength = params.cards?.length;
        if(cardLength == 0) { return; }
        const index =  Math.floor(Math.random() * cardLength);
        const cardKey = params.cards[index];
        const updatedCards = cards.map((card: any)=>{
            return {
                ...card,
                count: card.key == cardKey ? card.count + 1 : card.count
            }
        })
        setCards(updatedCards);

        const selectedCard = updatedCards.find((item: any)=>item.key == cardKey);
        console.log(cardKey, selectedCard);
        onSelectBox({
            boxCost: params.boxCost,
            ...selectedCard
        });
        
    }
    const handleSelectCard =async (params:any) => {
        console.log('selected card', params);
        if(params.count == 0) {
            console.log('card count is 0');
        }

        const cardKey = params.key;
        const updatedCards = cards.map((card: any)=>{
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

    useEffect(()=>{
        const updateCards = cards.map((card: any)=>{
            return {
                ...card,
                count: machineData.cardInfo ? machineData.cardInfo[card.key] || 0 : 0,
            }
        });
        setCards(updateCards)
    }, [machineData])

    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        {/* <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} /> */}
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>Manage your village</Text>
                        <View style={styles.buildings}>
                            {
                                buildings.map((item: any, index: number) => (
                                    <TouchableOpacity key={index} style={styles.building} onPress={() => handleSelectBuilding(item)}>
                                        <ImageBackground source={item.image} style={styles.buildingImage} resizeMode='contain' />
                                        <Text style={{ marginVertical: 5, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: item.value == formData.selectedBuilding.value ? '#f00' : "#ccc" }}> {item.title}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.boxContainer}>
                            {formData.selectedBuilding.value == 'building1' && (
                                <TouchableOpacity onPress={()=>handleSelectBox(formData.selectedBuilding)}>
                                    <ImageBackground source={ImageBoxEnchanted as ImageSourcePropType} style={styles.boxImage} resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                            {formData.selectedBuilding.value == 'building2' && (
                                <TouchableOpacity onPress={()=>handleSelectBox(formData.selectedBuilding)}>
                                    <ImageBackground source={ImageBoxProtection as ImageSourcePropType} style={styles.boxImage} resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                            {formData.selectedBuilding.value == 'building3' && (
                                <TouchableOpacity onPress={()=>handleSelectBox(formData.selectedBuilding)}>
                                    <ImageBackground source={ImageBoxResource as ImageSourcePropType} style={styles.boxImage} resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                            {formData.selectedBuilding.value == 'building4' && (
                                <TouchableOpacity onPress={()=>handleSelectBox(formData.selectedBuilding)}>
                                    <ImageBackground source={ImageBoxAttack as ImageSourcePropType} style={styles.boxImage} resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                            {
                                formData.selectedBuilding?.boxCost && (<Text style={styles.boxText}>{`${formData.selectedBuilding?.boxCost} coins needed`}</Text>)
                            }

                        </View>
                        <View style={styles.cards}>
                            {
                                cards.map((card: any) => (
                                    <TouchableOpacity key={card.name} style={styles.card} onPress={()=> handleSelectCard(card)}>
                                        <ImageBackground source={card.image as ImageSourcePropType} style={styles.cardImage} resizeMode='contain' >
                                            {/* <Text style={styles.cardCountText}>{card.count}</Text> */}
                                            <AnimatedCounter targetValue={card.count} duration={500} />
                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                        <Divider />
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="BACK" onPress={() => onCancel()} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    </>)
}

export default MyVillageDialog;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    modalContainer: {
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
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
        marginTop: 100,
        paddingHorizontal: 20,
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
        marginTop: 24,
        marginRight: 24,
        marginBottom: 24,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center'
    },
    alertButtonGroup: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 8,
        // marginLeft: 24,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between"
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
        alignItems: 'center',
        // flexWrap: 'wrap',
    },
    building: {
        alignItems: 'center',
    },
    buildingImage: {
        width: 64,
        height: 100,
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    card: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImage: {
        width: 80,
        height: 100,
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
        alignItems: 'center',
    },
    box: {

    },
   
    boxImage: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText: {
        paddingHorizontal: 10,
        fontSize: 22,
        color: '#f80',
        fontWeight:'bold'
    }
});

