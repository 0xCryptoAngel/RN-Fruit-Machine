import { useState } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import ImageBuilding1 from '../../../static/assets/building-1.jpg';
import ImageBuilding2 from '../../../static/assets/building-2.jpg';
import ImageBuilding3 from '../../../static/assets/building-3.jpg';
import ImageBuilding4 from '../../../static/assets/building-4.jpg';

import { ImageButton } from '../buttons';
import { Divider } from '../dividers';

const MapDialog = ({ isOpen, onOK, onCancel }: any) => {

    const [villages, setVillages] = useState([
        {
            userId: 1,
            name: 'village1',
            level: 3,
        },
        {
            userId: 2,
            name: 'village2',
            level: 3,
        },
        {
            userId: 3,
            name: 'village3',
            level: 3,
        },
        {
            userId: 4,
            name: 'village4',
            level: 3,
        },
        {
            userId: 5,
            name: 'village5',
            level: 3,
        },
        {
            userId: 6,
            name: 'village6',
            level: 3,
        },

    ]);
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
        selectedVillage: 'None',
        selectedBuilding: 'None',
    });
    const handleSelect = async (village: any, building: any) => {
        console.log(village, building);
        setFormData({
            ...formData,
            selectedVillage: village.userId,
            selectedBuilding: building.value
        });
        onOK(building);
        console.log({
            ...formData,
            selectedVillage: village.userId,
            selectedBuilding: building.value
        })
    }
    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => { /*onCancel()*/ }}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { }} onPress={() => { }}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        <Text style={styles.alertMessage}>Sellect village&building to get the golden ticket.</Text>
                        <ScrollView style={styles.villages}>
                            {villages?.map((village: any) => (
                                <View style={styles.buildings} key={village.userId}>
                                    <Text style={styles.vallageName}>{village.name}</Text>
                                    {
                                        buildings.map((item: any, index: number) => (
                                            <TouchableOpacity key={index} style={styles.coinItem} onPress={() => handleSelect(village, item)}>
                                                <ImageBackground source={item.image} style={styles.spinImage}>
                                                </ImageBackground>
                                                <Text style={{ 
                                                    marginVertical: 5, 
                                                    textAlign: 'center', 
                                                    fontSize: 14, 
                                                    fontWeight: 'bold', 
                                                    color: (item.value == formData.selectedBuilding) && (formData.selectedVillage == village.userId)  ? '#f00' : "#ccc",
                                                    }}> {item.title}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            ))}
                        </ScrollView>

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

export default MapDialog;

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
        textAlign: 'center',
        paddingBottom: 10,
        borderBottomColor: '#888',
        borderBottomWidth: 1,
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
    villages: {
        flexDirection: 'column',
    },
    buildings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexWrap: 'wrap',
        width: '100%',
        paddingVertical: 5,
        borderBottomColor: '#888',
        borderBottomWidth: 1,
    },
    spinItem: {

    },
    spinImage: {
        width: 50,
        height: 50,
    },
    buyCoins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    coinItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinImage: {
        width: 100,
        height: 150,
    },
    vallageName: {
        fontSize: 16,
        width: 70,
        fontWeight: 'bold',
    }
});

