import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, StyleSheet, Button, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Payment({ route }: any) {

    const navigation: any = useNavigation();

    const params = route.params;
    console.log('params', params);

    const { confirmPayment } = useConfirmPayment();

    const handleConfirmPayment = async () => {
        try {
            // const result = await confirmPayment('YOUR_PAYMENT_INTENT_CLIENT_SECRET', {
            //     type: "Card",
            //     billingDetails: {
            //         card: {
            //             number: '4242424242424242',
            //             exp_month: '12',
            //             exp_year: '25',
            //             cvc: '123',
            //         },
            //     },
            // });
            // console.log(result);
            navigation.navigate('Game', {
                'payment': 'success',
                'amount': params.value,
                'cost': 100,
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StripeProvider
            publishableKey="pk_test_f3duw0VsAEM2TJFMtWQ90QAT"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
            {/* Your app code here */}
            <View style={styles.container}>

                <Text style={styles.title}>Payment Details</Text>
                <Text style={styles.infoText}>Item: {params.item} </Text>
                <Text style={styles.infoText}>Amount: {params.amount} </Text>
                <Text style={styles.infoText}>Cost: {params.cost} </Text>
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
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />

                <Button title="Pay Now" onPress={handleConfirmPayment} />
            </View>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center',
        paddingVertical: 20,
    },
    infoText: {
        fontSize: 14,
        fontWeight: "500",

    }
})

export default Payment;