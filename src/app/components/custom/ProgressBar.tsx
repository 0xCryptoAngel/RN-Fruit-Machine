import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
    progress: number;
    label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.background, { width: '100%' }]}
            >
                <View style={[styles.progressBar, { width: `${progress}%` }]}>
                    {/* <Text style={styles.progressText}>{label}</Text> */}
                </View>
                <Text style={[styles.valueText]}>{label}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 30,
        borderRadius: 5,
        overflow: 'hidden',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    valueText: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        // left: '45%',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProgressBar;
