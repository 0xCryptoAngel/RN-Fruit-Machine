import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

const AnimatedCounter = ({ targetValue, duration }: any) => {
    // Initial value for opacity: 0
    const animatedValue = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Animate over time
        Animated.timing(animatedValue, {
            toValue: targetValue, // Animate to final value
            duration: duration,   // Make it take a while
            useNativeDriver: true // Use native driver for better performance
        }).start();

        fadeAnim.setValue(0.5);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }).start();
        // console.log(targetValue, duration);
    }, [targetValue, duration]);

    // Interpolate value to round it to an integer
    const animatedCount = animatedValue.interpolate({
        inputRange: [0, targetValue],
        outputRange: ['0', `${targetValue}`],
        extrapolate: 'clamp'
    });
    
    return (
        <View style={{ backgroundColor: 'transparent'}}>
            {/* Animated component */}
            <Animated.View
                style={[
                    {
                        paddingHorizontal: 5,
                        opacity: fadeAnim,
                    },
                ]}>
                <Text style={{  fontSize: 28, color: '#fff' }}>{targetValue}</Text>
            </Animated.View>
        </View>
    );
};

export default AnimatedCounter;
