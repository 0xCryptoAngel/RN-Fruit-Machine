import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground, FlatList } from 'react-native';

import ImageBuilding1 from '../../../static/assets/building-1.jpg';
import ImageBuilding2 from '../../../static/assets/building-2.jpg';
import ImageBuilding3 from '../../../static/assets/building-3.jpg';
import ImageBuilding4 from '../../../static/assets/building-4.jpg';
import BackArrowImg from '../../../static/assets/back_arrow_button.png';
import BackgroundAttack from '../../../static/assets/background-attack.png';
import ImageAttackCoin from '../../../static/assets/others/coin_attack.png';
import ImageAttackBlock from '../../../static/assets/others/block_attack.png';

import { ImageButton } from '../buttons';
import { Divider } from '../dividers';
import { getUsers } from '../../services/gameService';
import CharacterInfo from '../custom/CharacterInfo';

const MapDialog = ({ isOpen, target, email, onOK, onCancel }: any) => {

    const [villages, setVillages]: any = useState([
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
            ...village,
            selectedVillage: village.userId,
            selectedBuilding: building.value
        });
        // onOK(building);
        console.log({
            ...formData,
            ...village,
            selectedVillage: village.userId,
            selectedBuilding: building.value
        })
    }
    const handleAttack = async (village: any) => {
        console.log('village', village);
        setFormData({
            ...formData,
            ...village,
            selectedVillage: village.userId,
            selectedBuilding: ''
        });

        onOK({
            ...formData,
            ...village,
            selectedVillage: village.userId,
            selectedBuilding: ''
        });
    }
    useEffect(() => {
        if (!isOpen) return;

        setFormData({
            selectedVillage: 'None',
            selectedBuilding: 'None',
        });

        const fetchData = async () => {
            const users = await getUsers(20);
            console.log(users);

            const newVillages: any = [];
            users?.map((user) => {
                if (user.email == email) return;
                newVillages.push({
                    ...user,
                    userId: user.email,
                    name: user.username,
                    level: user.shield,
                    golden_ticket_owned: user.golden_ticket_owned,
                    golden_ticket_building: user.golden_ticket_building,
                })
            });
            setVillages(newVillages);
        }

        fetchData();

    }, [isOpen]);
    
    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <CharacterInfo name={item.name} level={item.level} defencePower={item.shield} onAttack={() => handleAttack(item)}/>
        </View>
    );

    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => { /*onCancel()*/ }}>
            {/* <TouchableOpacity style={styles.modalContainer} onPressOut={() => { }} onPress={() => { }}> */}
            <View style={styles.modalView}>
                <ImageBackground style={styles.contentContainer} source={BackgroundAttack as ImageSourcePropType} resizeMode='cover'>
                    {/* <Text style={styles.alertMessage}>{`Attack on ${target}`}</Text> */}
                    <ImageBackground source={( target =="coin" ? ImageAttackCoin : ImageAttackBlock) as ImageSourcePropType} style={styles.titleImage} resizeMode='contain' />

                    <FlatList
                        data={villages}
                        renderItem={renderItem}
                        keyExtractor={item => item.userId}
                        numColumns={1}
                        // columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.list}
                    />
                    <TouchableOpacity style={styles.backArrowButton} onPress={() => onCancel()}>
                        <ImageBackground source={BackArrowImg as ImageSourcePropType} style={styles.backArrowButton} resizeMode='cover' />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            {/* </TouchableOpacity> */}
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
    contentContainer: {
        // flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        // maxWidth: 300,
        marginTop: 10,
        // paddingHorizontal: 20,
        elevation: 24,
        borderRadius: 2,
        // backgroundColor: '#fda46d'
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
        // marginBottom: 24,
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#f00",
        textAlign: 'center',
        // paddingBottom: 10,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
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
        width: 150,
        fontWeight: 'bold',
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrowButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        width: 50,
        height: 50,
    },
    row: {
        justifyContent: 'space-around',
    },
    item: {
        flex: 1,
        margin: 5,
        paddingHorizontal: 10,
    },
    list: {
        paddingVertical: 10,
    },
    titleImage: {
        width: '100%',
        height: 150,
    }
});

