import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import staticImage from '../../../static/assets/golden-ticket-small.png';
import { ImageButton } from '../buttons';

interface SpinsOutDialogProps {
    isOpen: boolean;
    onOK: () => void;
    onCancel: () => void;
}

const SpinsOutDialog : React.FC<SpinsOutDialogProps> = ({ isOpen, onOK, onCancel }) => {

    const handleClick = () => {
        onCancel();
        onOK();
    }

    return (
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}>
            <View style={styles.modalView}>
                    <View style={styles.alert}>
                        <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} />
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>Your spins are out at the moment.</Text>
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="BUY MORE SPINS" onPress={() => handleClick()} />
                            </View>
                            <View style={styles.alertButton}>
                                <ImageButton title="BACK" onPress={() => onCancel()} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default SpinsOutDialog;


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
        top: -50,
        transform: [{ translateX: -50 }],
        borderRadius: 50,
    },
    label: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#333',
    },
    input: {
        height: 40,
        marginBottom: 6,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: '#000',
        fontFamily: 'Roboto',
        fontWeight: '500',
    },
    message: {
        marginBottom: 6,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: '#000',
        fontFamily: 'Roboto',
        fontWeight: '500',
        alignItems: 'flex-start', 
        textAlignVertical: 'top', 
    },

});
