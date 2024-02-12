import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import staticImage from '../../../static/assets/coin.jpg';
import ImageCoin600k from '../../../static/assets/600k.jpg'
import ImageCoin1m from '../../../static/assets/1m.jpg'
import ImageCoin4m from '../../../static/assets/4m.jpg'

import ImageSpin25 from '../../../static/assets/spin25.png'
import ImageSpin75 from '../../../static/assets/spin75.png'
import ImageSpin200 from '../../../static/assets/spin200.png'
import { ImageButton } from '../buttons';
import { Divider } from '../dividers';

const ShopDialog = ({ isOpen, onOK, onCancel }: any) => {

    const spinItems = [
        {
            type: 'spin',
            title: 'Spin 25',
            value: 25,
            image: ImageSpin25
        },
        {
            type: 'spin',
            title: 'Spin 75',
            value: 75,
            image: ImageSpin75
        },
        {
            type: 'spin',
            title: 'Spin 200',
            value: 200,
            image: ImageSpin200
        },
    ]

    const coinItems = [
        {
            type: 'coin',
            title: 'Coin 600K',
            value: 600 * 1000,
            image: ImageCoin600k
        },
        {
            type: 'coin',

            title: 'Coin 1M',
            value: 1 * 1000000,
            image: ImageCoin1m
        },
        {
            type: 'coin',

            title: 'Coin 4M',
            value: 4 * 1000000,
            image: ImageCoin4m
        },
    ]

    const handleBuy =async (params:any) => {
        console.log(params);
        onOK(params);
    }
    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} />
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>What do you need to buy now?</Text>
                        <View style={styles.buySpins}>
                            {
                                spinItems.map((item: any, index: number) => (
                                    <TouchableOpacity key={index} style={styles.coinItem} onPress={()=>handleBuy(item)}>
                                        <ImageBackground source={item.image} style={styles.spinImage}>

                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <Divider />
                        <View style={styles.buyCoins}>
                            {
                                coinItems.map((item: any, index: number) => (
                                    <TouchableOpacity key={index} style={styles.coinItem}  onPress={()=>handleBuy(item)}>
                                        <ImageBackground source={item.image} style={styles.coinImage}>

                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="BACK" onPress={() => onCancel() } />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
        // marginLeft: 24,
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
        marginTop: 12,
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
    },
    spinItem: {

    },
    spinImage: {
        width: 100,
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
    }
});

