import { Fragment } from 'react';
import { StyleSheet, View, } from 'react-native';

function Divider() {

    return (
        <Fragment>
            <View style={styles.divider} />
        </Fragment>
    );
}

const styles = StyleSheet.create({
    divider: {
        width: 300,
        marginVertical: 20,
        height: StyleSheet.hairlineWidth,
    },
});

export default Divider;
