import React, { useEffect, useRef, useState, useContext } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, StyleSheet, Button, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import appConfig from '../util/config';
import { getUser, updateUser } from '../services/gameService';
import { UserContext } from '../App';
import ImageLogoText from '../../static/assets/logo-text.png';

function Payment({ route }: any) {

    const navigation: any = useNavigation();
    const user = useContext(UserContext);

    const params = route.params;
    console.log(params);

    const { confirmPayment } = useStripe();

    const createPaymentIntent = async () => {
        try {
            const response = await fetch('https://api.stripe.com/v1/payment_intents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${appConfig.stripeSK}`,
                },
                body: `amount=${params.cost * 100}&currency=gbp&payment_method_types[]=card`,
            });

            if (!response.ok) {
                throw new Error('Failed to create Payment Intent');
            }

            const data = await response.json();
            console.log('Payment Intent created:', data);
            // Use the obtained client secret to confirm the payment
            const clientSecret = data.client_secret;
            return clientSecret;
            // Continue with payment confirmation logic
        } catch (error) {
            console.error('Error creating Payment Intent:', error);
            // Handle error
            return '';
        }
    };

    const handleConfirmPayment = async () => {
        try {
            // const clientSecret = '';
            createPaymentIntent()
                .then(async (secret: any) => {
                    const { paymentIntent, error } = await confirmPayment(secret, {
                        paymentMethodType: 'Card',
                    });

                    if (error) {
                        console.error('Failed to confirm payment:', error);
                        // Handle payment failure

                    } else if (paymentIntent) {
                        console.log('Payment confirmed:', paymentIntent);
                        // Handle successful payment
                        // save result
                        const newData = {
                            coins: params.currentCoins + (params.item == 'coin' ? params.amount : 0),
                            spins: params.currentSpins + (params.item == 'spin' ? params.amount : 0),
                        }
                        console.log(newData);

                        updateUser(user?.email, newData)
                            .then(() => {
                                console.log('User updated successfully');
                                // navigation.navigate('Game');

                                navigation.navigate('Game', {
                                    'payment': 'success',
                                    'amount': params.amount,
                                    'cost': params.cost * 100,
                                });
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                    }

                });

        } catch (error) {
            console.log(error);
        }
    };
    const handleBack = async () => {
        navigation.navigate('Game', {
            'payment': 'cancel',
            'amount': params.value,
            'cost': params.cost * 100,
        });
    }
    return (
        <StripeProvider
            publishableKey={appConfig.stripePK}
            urlScheme="golden-ticket-scheme"
            merchantIdentifier={`merchant.com.${appConfig.stripeSK}`}
        >
            {/* Your app code here */}
            <View style={styles.container}>
                <View style={{ marginTop: 30 }}>
                    <Image source={ImageLogoText as ImageSourcePropType} style={styles.logoImage} />
                </View>
                <Text style={styles.title}>Payment Details</Text>
                <View style={styles.paymentDetail}>
                    <Text style={styles.infoText}>Item: {params.item} </Text>
                    <Text style={styles.infoText}>Amount: {params.amount} </Text>
                    <Text style={styles.infoText}>Cost: {params.cost} £</Text>
                </View>
                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        // console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        // console.log('focusField', focusedField);
                    }}
                />

                <TouchableOpacity style={styles.payButton} onPress={handleConfirmPayment} >
                    <Text style={styles.payText}>Pay Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} >
                    <Text style={styles.payText}>Back</Text>
                </TouchableOpacity>
            </View>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        alignItems: 'center',
        textAlign: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: 'center',
        paddingTop: 20,
        color: '#00f',
    },
    infoText: {
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 5,
        color: '#468',

    },
    paymentDetail: {
        width: "100%",
        textAlign: 'left',
        // paddingHorizontal: 15,
        paddingVertical: 10,
    },
    payButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08f',
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    payText: {
        width: '100%',
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#088',
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginVertical: 5,
    },
    logoImage: {
        width: 300,
        height: 70,
    },
})

export default Payment;