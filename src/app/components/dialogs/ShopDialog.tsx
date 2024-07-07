import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import GemBar from '../custom/GemBar';
// import ImageCoin600k from '../../../static/assets/card_200k_coins.png' //600k.jpg
// import ImageCoin1m from '../../../static/assets/card_200k_coins.png' //1m.jpg
// import ImageCoin4m from '../../../static/assets/card_200k_coins.png' //4m.jpg

import ImageCoinX2 from '../../../static/assets/shop/coin_multi_x2_shop.png';
import ImageCoinX3 from '../../../static/assets/shop/coin_multi_x3_shop.png';



import ImageSpin10 from '../../../static/assets/shop/spin_cards_10_shop.png' //10
import ImageSpin25 from '../../../static/assets/shop/spin_cards_20_shop.png' //25
import ImageSpin75 from '../../../static/assets/shop/spin_cards_30_shop.png' //75
import ImageSpin200 from '../../../static/assets/shop/spin_cards_40_shop.png' //200

import ImageGem150 from '../../../static/assets/gems_150.png';
import ImageGem500 from '../../../static/assets/gems_500.png';
import ImageGem2500 from '../../../static/assets/gems_2500.png';

import BackArrowImg from '../../../static/assets/back_arrow_button.png';


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
        {
            type: 'coin',
            title: 'Coin x2',
            value: 2,
            image: ImageCoinX2,
            cost: 100,
        },
        {
            type: 'coin',
            title: 'Coin x3',
            value: 3,
            image: ImageCoinX3,
            cost: 200,
        },

    ]

    const handleBuy = async (params: any) => {
        console.log(params);
        onOK(params);
    }

    const chargeMoney = async (gem : any) => {
        navigation.navigate('Payment', {
            'item': 'Gem',
            'amount': gem.value,
            'cost': gem.cost,
            'currentCoins': gem.coins,
            'currentSpins': 0,
        });
    }
    const GridItem = ({ item, onClick }: any) => (
        <View style={styles.gridItem} >
            <TouchableOpacity style={styles.coinItem} onPress={() => onClick()}>
                <ImageBackground source={item.image} style={styles.spinImage} resizeMode='contain'>
                    {item.type != 'gem' && (<Text style={styles.price}>{`${item.cost}`}</Text>)}
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
                        </View>
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
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 40,
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
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: '#f36686'
    },
    scroll: {
        flex: 1,
    },
    
});

