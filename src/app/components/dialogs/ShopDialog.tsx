import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import staticImage from '../../../static/assets/golden-ticket-small.png';
import ImageCoin600k from '../../../static/assets/card_200k_coins.png' //600k.jpg
import ImageCoin1m from '../../../static/assets/card_200k_coins.png' //1m.jpg
import ImageCoin4m from '../../../static/assets/card_200k_coins.png' //4m.jpg

import ImageSpin10 from '../../../static/assets/card_xtra_spin_10.png' //10
import ImageSpin25 from '../../../static/assets/card_xtra_spins_20.png' //25
import ImageSpin75 from '../../../static/assets/card_xtra_spins_40.png' //75
import ImageSpin200 from '../../../static/assets/card_xtra_spins_100.png' //200

import ImageShop from '../../../static/assets/shop_bachground.png'
import BackArrowImg from '../../../static/assets/back_arrow_button.png';
import ChargeMoneyImg from '../../../static/assets/charge_money.jpg';
import ImageCoinBack from '../../../static/assets/coin-bar.png';

import { ImageButton } from '../buttons';
import { Divider } from '../dividers';


const ShopDialog = ({ isOpen, data, onOK, onCancel }: any) => {

    const navigation: any = useNavigation();

    const numColumns = 2;
    const shopItems = [
        {
            type: 'spin',
            title: 'Spin 10',
            value: 10,
            image: ImageSpin10,
            cost: 50000,
        },
        {
            type: 'spin',
            title: 'Spin 25',
            value: 25,
            image: ImageSpin25,
            cost: 100000,
        },
        {
            type: 'spin',
            title: 'Spin 75',
            value: 75,
            image: ImageSpin75,
            cost: 200000
        },
        {
            type: 'spin',
            title: 'Spin 200',
            value: 200,
            image: ImageSpin200,
            cost: 300000
        },
        // {
        //     type: 'coin',
        //     title: 'Coin 600K',
        //     value: 600 * 1000,
        //     image: ImageCoin600k,
        //     cost: 1.5
        // },
        // {
        //     type: 'coin',
        //     title: 'Coin 1M',
        //     value: 1 * 1000000,
        //     image: ImageCoin1m,
        //     cost: 2.5
        // },
        // {
        //     type: 'coin',
        //     title: 'Coin 4M',
        //     value: 4 * 1000000,
        //     image: ImageCoin4m,
        //     cost: 8.5,
        // },
    ];
    const spinItems = [
        {
            type: 'spin',
            title: 'Spin 25',
            value: 25,
            image: ImageSpin25,
            cost: 1.5,
        },
        {
            type: 'spin',
            title: 'Spin 75',
            value: 75,
            image: ImageSpin75,
            cost: 2.5
        },
        {
            type: 'spin',
            title: 'Spin 200',
            value: 200,
            image: ImageSpin200,
            cost: 8.99
        },
    ]

    const coinItems = [
        {
            type: 'coin',
            title: 'Coin 600K',
            value: 600 * 1000,
            image: ImageCoin600k,
            cost: 1.5
        },
        {
            type: 'coin',
            title: 'Coin 1M',
            value: 1 * 1000000,
            image: ImageCoin1m,
            cost: 2.5
        },
        {
            type: 'coin',
            title: 'Coin 4M',
            value: 4 * 1000000,
            image: ImageCoin4m,
            cost: 8.5,
        },
    ]

    const handleBuy = async (params: any) => {
        console.log(params);
        onOK(params);
    }

    const chargeMoney = async () => {
        navigation.navigate('Payment', {
            'item': 'Coin',
            'amount': 100,
            'cost': 4.99,
            'currentCoins': data.coins,
            'currentSpins': 0,
        });
    }
    const GridItem = ({ item }: any) => (
        <View style={styles.gridItem}>
            <TouchableOpacity key={item.title} style={styles.coinItem} onPress={() => handleBuy(item)}>
                <ImageBackground source={item.image} style={styles.spinImage} >
                    <Text style={styles.price}>{`${item.cost}`}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
    return (<>
        {/* <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}> */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer} >
                <View style={styles.modalView}>
                    <ImageBackground source={ImageShop as ImageSourcePropType} style={styles.body}>
                        {/* <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} /> */}
                        <Text style={styles.alertMessage}></Text>
                        {/* <Text style={styles.alertMessage}>What do you need to buy now?</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <ImageBackground style={styles.coinBar} source={ImageCoinBack as ImageSourcePropType} resizeMode="cover">
                                <Text style={styles.coinText}>{`${data?.coins || 0}`}</Text>
                            </ImageBackground>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 0 }}>
                                <ImageBackground source={ChargeMoneyImg as ImageSourcePropType} style={styles.chargeButton} resizeMode='cover' />
                                <Text style={styles.coinText}>{`${data?.coins || 0}`}</Text>
                            </View> */}
                            <TouchableOpacity style={styles.chargeButton} onPress={chargeMoney}>
                                <ImageBackground source={ChargeMoneyImg as ImageSourcePropType} style={styles.chargeButton} resizeMode='cover' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: '80%', borderRadius: 10 }}>
                            <FlatList
                                data={shopItems}
                                renderItem={({ item }) => <GridItem item={item} />}
                                keyExtractor={item => item.title}
                                numColumns={numColumns}
                                contentContainerStyle={styles.contentContainer}
                            />
                        </View>

                        {/* <View style={styles.items}>

                            <View style={styles.buySpins}>
                                {
                                    spinItems.map((item: any, index: number) => (
                                        <TouchableOpacity key={index} style={styles.coinItem} onPress={() => handleBuy(item)}>
                                            <ImageBackground source={item.image} style={styles.spinImage} >
                                                <Text style={styles.price}>{`£${item.cost}`}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <Divider />
                            <View style={styles.buyCoins}>
                                {
                                    coinItems.map((item: any, index: number) => (
                                        <TouchableOpacity key={index} style={styles.coinItem} onPress={() => handleBuy(item)}>
                                            <ImageBackground source={item.image} style={styles.coinImage} >
                                                <Text style={styles.price}>{`£${item.cost}`}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <View style={styles.alertButtonGroup}>
                                <View style={styles.alertButton}>
                                    <ImageButton title="BACK" onPress={() => onCancel()} />
                                </View>
                            </View>
                        </View> */}
                        {/* <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="BACK" onPress={() => onCancel()} />
                            </View>
                        </View> */}
                    </ImageBackground>
                    <TouchableOpacity style={styles.backArrowButton} onPress={() => onCancel()}>
                        <ImageBackground source={BackArrowImg as ImageSourcePropType} style={styles.backArrowButton} resizeMode='cover' >
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>)
}

export default ShopDialog;

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
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        elevation: 24,
        borderRadius: 2,
        // backgroundColor: '#fff',
        resizeMode: 'contain'
    },
    alertTitle: {
        marginHorizontal: 24,
        fontWeight: "bold",
        fontSize: 24,
        color: "#000"
    },
    alertMessage: {
        // marginLeft: 24,
        marginRight: 24,
        marginBottom: 50,
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
        marginTop: 12,
        marginRight: 8
    },
    alertIcon: {
        width: 100,
        height: 100,
        left: '50%',
        top: -30,
        transform: [{ translateX: -50 }],
        borderRadius: 50,
    },
    buySpins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    buyCoins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    coinItem: {
        alignItems: 'center',
    },
    coinImage: {
        width: 90,
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain',
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
        borderRadius: 10,
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
    backArrowButton: {
        position: 'absolute',
        right: 10,
        top: 20,
        width: 50,
        height: 50,
    },
    coinText: {
        fontSize: 36,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center',
        // paddingHorizontal: 10,
        marginLeft: 30,
    },
    chargeButton: {
        width: 50,
        height: 50,
    },
    coinBar: {
        width: 300,
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

