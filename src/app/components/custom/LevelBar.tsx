import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType, Animated } from 'react-native';
import ProgressBar from './ProgressBar';
import ImageCoinBack from '../../../static/assets/lvl_asset.png';

interface LevelBarProps {
  currentAmount: number;
  targetAmount?: any;
}

const LevelBar: React.FC<LevelBarProps> = ({ currentAmount, targetAmount }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <ImageBackground source={ImageCoinBack as ImageSourcePropType} style={styles.background} resizeMode='stretch'>
      <View style={styles.container}>
        <ProgressBar progress={currentAmount / targetAmount * 100} label={`${currentAmount}`} />
        {/* <Text style={styles.coinText}>{`${currentAmount}/${targetAmount}`}</Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    // width: '100%',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  container: {
    width: '100%',
    paddingLeft: 50,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  coinText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
});

export default LevelBar;
