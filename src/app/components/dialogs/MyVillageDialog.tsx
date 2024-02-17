import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import ImageBuilding1 from '../../../static/assets/building-1.jpg';
import ImageBuilding2 from '../../../static/assets/building-2.jpg';
import ImageBuilding3 from '../../../static/assets/building-3.jpg';
import ImageBuilding4 from '../../../static/assets/building-4.jpg';

import { ImageButton } from '../buttons';
import { Divider } from '../dividers';

const MyVillageDialog = ({ isOpen, onOK, onCancel }: any) => {

    const buildings = [
        {
            type: 'building',
            title: 'Building 1',
            value: 'building1',
            image: ImageBuilding1
        },
        {
            type: 'building',
            title: 'Building 2',
            value: 'building2',
            image: ImageBuilding2
        },
        {
            type: 'building',
            title: 'Building 3',
            value: 'building3',
            image: ImageBuilding3
        },
        {
            type: 'building',
            title: 'Building 4',
            value: 'building4',
            image: ImageBuilding4
        },

    ]
    const [formData, setFormData] = useState({
        selectedBuilding: 'None',
    });
    const handleSelect = async (params: any) => {
        console.log(params);
        setFormData({
            ...formData,
            selectedBuilding: params.value
        });
        onOK(params);
    }
    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        {/* <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} /> */}
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>Sellect one building to hide the golden ticket.</Text>
                        <View style={styles.buySpins}>
                            {
                                buildings.map((item: any, index: number) => (
                                    <TouchableOpacity key={index} style={styles.coinItem} onPress={() => handleSelect(item)}>
                                        <ImageBackground source={item.image} style={styles.spinImage}>
                                        </ImageBackground>
                                        <Text style={{ marginVertical: 5, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: item.value == formData.selectedBuilding ? '#f00' : "#ccc" }}> {item.title}</Text>
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
    }
});

