import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CoinBar from '../custom/CoinBar';
import GemBar from '../custom/GemBar';
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

import { ScrollView } from 'react-native-gesture-handler';
import ImageGem150 from '../../../static/assets/gems_150.png';
import ImageGem500 from '../../../static/assets/gems_500.png';
import ImageGem2500 from '../../../static/assets/gems_2500.png';

const ShopDialog = ({ isOpen, data, onOK, onCancel }: any) => {

    const navigation: any = useNavigation();

    const numColumns = 2;
    const gemItems = [
        {
            type: 'gem',
            id: 'gem_150',
            title: 'Gem 150',
            image: ImageGem150,
            value: 150,
            cost: 2.99,
        },
        {
            type: 'gem',
            id: 'gem_500',
            title: 'Gem 500',
            image: ImageGem500,
            value: 500,
            cost: 5.49
        },
        {
            type: 'gem',
            id: 'gem_2500',
            title: 'Gem 2500',
            image: ImageGem2500,
            value: 2500,
            cost: 19.99,
        },
    ]
    const spinItems = [
        {
            type: 'spin',
            title: 'Spin 10',
            value: 10,
            image: ImageSpin10,
            cost: 500,
        },
        {
            type: 'spin',
            title: 'Spin 25',
            value: 25,
            image: ImageSpin25,
            cost: 1000,
        },
        {
            type: 'spin',
            title: 'Spin 75',
            value: 75,
            image: ImageSpin75,
            cost: 2000
        },
        {
            type: 'spin',
            title: 'Spin 200',
            value: 200,
            image: ImageSpin200,
            cost: 3000
        },

    ];
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

    const chargeMoney = async ({ gem } : any) => {
        navigation.navigate('Payment', {
            'item': 'Coin',
            'amount': 100,
            'cost': 4.99,
            'currentCoins': data.coins,
            'currentSpins': 0,
        });
    }
    const GridItem = ({ item, onClick }: any) => (
        <View style={styles.gridItem} >
            <TouchableOpacity style={styles.coinItem} onPress={() => onClick}>
                <ImageBackground source={item.image} style={styles.spinImage} resizeMode='contain'>
                    <Text style={styles.price}>{`${item.cost}`}</Text>
                </ImageBackground>
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
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <GemBar gemAmount={data?.gems || 0} />
                            {/* <TouchableOpacity style={styles.chargeButton} onPress={chargeMoney}>
                                <ImageBackground source={ChargeMoneyImg as ImageSourcePropType} style={styles.chargeButton} resizeMode='cover' />
                            </TouchableOpacity> */}
                        </View>
                        {/* <Text style={styles.alertMessage}></Text> */}
                        <ScrollView style={styles.scroll}>
                            <Text style={styles.divideText}>GEMS</Text>
                            <View style={styles.items}>
                                {gemItems.map((gem: any) => (<GridItem key={gem.title}  item={gem} onClick={() => chargeMoney(gem)}/>))}
                            </View>
                            <Text style={styles.divideText}>SPINS</Text>
                            <View style={styles.items}>
                                {spinItems.map((item: any) => (<GridItem key={item.title}  item={item} onClick={()=> handleBuy(item)}/>))}
                            </View>
                            <Text style={styles.divideText}>COINS</Text>
                            <View style={styles.items}>
                                {coinItems.map((item: any) => (<GridItem key={item.title}  item={item} onClick={()=>handleBuy(item)}/>))}
                            </View>
                        </ScrollView>
                    </View>
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
        // backgroundColor: "transparent",
        backgroundColor: '#e1a870',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        width: '100%',
        elevation: 1,
        // marginTop: 20,
        // borderRadius: 2,
        // backgroundColor: '#fff',
        resizeMode: 'contain',
        paddingVertical: 20,
    },

    alertMessage: {
        // marginLeft: 24,
        marginRight: 5,
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center'
    },
    spinImage: {
        width: 250,
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    coinItem: {
        alignItems: 'center',
        flex: 1,
    },
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 10,
    },

    contentContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    items: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    gridItem: {
        flex: 1,
        margin: 10,
        padding: 5,
        overflow: 'hidden',
        flexBasis: '45%'
        // backgroundColor: '#ccc',
        // borderRadius: 10,
        // elevation: 5,
    },
    backArrowButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 50,
        height: 50,
    },
    chargeButton: {
        width: 50,
        height: 50,
    },
    divideText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 10,
        color: '#fff',
        borderTopColor: '#e9c394',
        borderTopWidth: 1,
        paddingTop: 10,
        marginTop: 10
    },
    scroll: {
        flex: 1,
    },
    
});

