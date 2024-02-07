import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import staticImage from '../../../static/assets/coin.jpg';
import { ImageButton } from '../buttons';

const InviteDialog = ({ isOpen, onOK, onCancel }: any) => {

    const [formData, setFormData]: any = useState({
        email: '',
        message: '',
    });

    const handleInvite = async () => {
        console.log(formData);
        onOK(formData);
    }

    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} />
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>You can invite your friend and earn extra spins and coins</Text>
                        <View style={{}}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                value={formData.email}
                                placeholder="Input email to invite your friend"
                            />
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setFormData({ ...formData, message: text })}
                                value={formData.message}
                                placeholder="Input short notes"
                            />
                        </View>
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="INVITE" onPress={() => handleInvite()} />
                            </View>
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

export default InviteDialog;

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
    
});

