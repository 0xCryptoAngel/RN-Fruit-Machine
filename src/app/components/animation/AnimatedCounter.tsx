import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

const AnimatedCounter = ({ targetValue, duration }: any) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current; // New scale value
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: targetValue,
            duration: duration,
            useNativeDriver: true
        }).start();

        fadeAnim.setValue(0.5);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
        }).start();

        // Scaling animation
        Animated.timing(scaleValue, {
            toValue: 2.2, // Scale factor
            duration: 500, // Animation duration
            useNativeDriver: true
        }).start(() => {
            // Reset scale after animation completes
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        });
    }, [targetValue, duration]);

    const animatedCount = animatedValue.interpolate({
        inputRange: [0, targetValue],
        outputRange: ['0', `${targetValue}`],
        extrapolate: 'clamp'
    });

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {/* Apply scaling transformation to the Animated.View */}
            <Animated.View
                style={[
                    {
                        paddingHorizontal: 5,
                        opacity: fadeAnim,
                        transform: [{ scale: scaleValue }] // Apply scale transformation
                    },
                ]}>
                <Text style={{ fontSize: 28, color: '#fff' }}>{targetValue}</Text>
            </Animated.View>
        </View>
    );
};

export default AnimatedCounter;
