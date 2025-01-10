import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Modal, Button, TouchableOpacity, Image, ImageSourcePropType, ImageBackground } from 'react-native';

import staticImage from '../../../static/assets/golden-ticket-small.png';
import BackgroundInvite from '../../../static/assets/background-invite.jpg'

import { ImageButton, BackButton } from '../buttons';

const InviteDialog = ({ isOpen, onOK, onCancel }: any) => {


    const [formData, setFormData] = useState({
        email: 'dearfriend@gmail.com',
        message: `Hi there,\nI’m inviting you to join me on the Golden Ticket app!\nEarn rewards, have fun, and experience something amazing.\nDon’t miss out!`,
    });

    const handleInvite = async () => {
        console.log(formData);
        onOK(formData);
    }

    return (<>
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={() => onCancel()}>
            {/* <TouchableOpacity style={styles.modalContainer} onPressOut={() => { onCancel() }}> */}
            <View style={styles.modalView}>
                <ImageBackground source={BackgroundInvite as ImageSourcePropType} style={styles.body}>
                    <View style={styles.alert}>
                        <Image style={styles.alertIcon} source={staticImage as ImageSourcePropType} />
                        {/* <Text style={styles.alertTitle}>Shop</Text> */}
                        <Text style={styles.alertMessage}>You can invite your friend and earn extra spins and coins</Text>
                        <View style={{
                            justifyContent: 'center',
                            paddingVertical: 5,
                        }}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                value={formData.email}
                                placeholder="Input email to invite your friend"
                            />
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={styles.message}
                                onChangeText={(text) => setFormData({ ...formData, message: text })}
                                value={formData.message}
                                placeholder="Input your message"
                                multiline={true}
                                numberOfLines={8}

                            />
                        </View>
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <ImageButton title="Send Invite" onPress={() => handleInvite()} />
                            </View>
                            {/* <View style={styles.alertButton}>
                                <ImageButton title="Cancel" onPress={() => onCancel()} />
                            </View> */}
                        </View>
                    </View>
                    <BackButton style={{ position: 'absolute', zIndex: 10, right: 5, top: 5 }} onPress={() => onCancel()} />
                </ImageBackground>
            </View>
            {/* </TouchableOpacity> */}
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
        backgroundColor: '#FFFFFF', // White background
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
    alert: {
        flex: 1,
        width: '100%',
        marginTop: 100,
        paddingHorizontal: 20,
        elevation: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF', // White
    },
    alertTitle: {
        marginHorizontal: 24,
        fontWeight: "bold",
        fontSize: 24,
        color: "#333333", // Dark gray
    },
    alertMessage: {
        marginRight: 24,
        marginBottom: 24,
        fontSize: 18,
        fontWeight: '600',
        color: "#555555", // Medium gray
        textAlign: 'center',
    },
    alertButtonGroup: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 8,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    alertButton: {
        marginTop: 12,
        marginRight: 8,
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
        color: '#6200EE', // Deep Purple
    },
    input: {
        height: 40,
        marginTop: 3,
        marginBottom: 6,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#6200EE', // Deep Purple
        backgroundColor: '#F7F7F7', // Light Gray
        color: '#555555', // Medium Gray
    },
    message: {
        marginTop: 3,
        marginBottom: 6,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#6200EE', // Deep Purple
        backgroundColor: '#F7F7F7', // Light Gray
        color: '#555555', // Medium Gray
        textAlignVertical: 'top',
    },
    body: {
        flex: 1,
        width: '100%',
        elevation: 24,
        borderRadius: 2,
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF', // White
    },
});

