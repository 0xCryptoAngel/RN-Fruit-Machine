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

import { Divider } from '../dividers';

import ImageResult from '../../../static/assets/background-result.jpg'
import ImageGodlenTicket from '../../../static/assets/golden-ticket-small.png'


const ResultDialog = ({ isOpen, data, onOK, onCancel }: any) => {

    const navigation: any = useNavigation();

    const shopItems = [
        {
            type: 'spin',
            title: 'Spin 10',
            value: 10,
            image: ImageSpin10,
            cost: 50000,
        },
        
    ];

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
            <TouchableOpacity key={item.title} style={styles.itemContainer} >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <ImageBackground source={ImageGodlenTicket as ImageSourcePropType} style={styles.leftImage} />
                    <View style={{ paddingHorizontal: 10}}>
                        <Text style={{  fontSize: 16, fontWeight: 'bold', color: '#333' }}>{ item.name }</Text>
                        <Text style={{  fontSize: 14, fontWeight: '700', color: '#105378' }}>{ item.description }</Text>
                    </View>
                </View>
                <Text style={styles.price}>{`+${item.amount}`}</Text>
            </TouchableOpacity>
        </View>
    );
    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer} >
                <View style={styles.modalView}>
                    <ImageBackground source={ImageResult as ImageSourcePropType} style={styles.body}>
                        <Text style={styles.titleText}>Result</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <ImageBackground style={styles.coinBar} source={ImageCoinBack as ImageSourcePropType} resizeMode="cover">
                                <Text style={styles.coinText}>You Won</Text>
                            </ImageBackground>
                        </View>
                        <View style={{ height: '80%', borderRadius: 10 }}>
                            <FlatList
                                data={data}
                                renderItem={({ item }) => <GridItem item={item} />}
                                keyExtractor={item => item.name}
                                numColumns={1}
                                contentContainerStyle={styles.contentContainer}
                            />
                        </View>
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

export default ResultDialog;

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
    titleText: {
        marginVertical: 20,
        fontSize: 32,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#fff",
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    coinImage: {
        width: 90,
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    price: {
        color: '#ff6852',
        fontSize: 20,
        fontWeight: '700',
        // paddingBottom: 10,
        marginRight: 10
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
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 50,
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
        color: "#00f",
        textAlign: 'center',
        // paddingHorizontal: 10,
        marginLeft: 30,
    },
    chargeButton: {
        width: 50,
        height: 50,
    },
    coinBar: {
        width: '100%',
        height: 80,
        // paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    leftImage: {
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain',
        backgroundColor: '#0ff',
        borderRadius: 50,
    },
});

