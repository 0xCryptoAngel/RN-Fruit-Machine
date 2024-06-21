import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import ImageCoinBack from '../../../static/assets/shield.png';

interface ShieldBarProps {
  currentAmount: number;
  targetAmount?: any;
}

const ShieldBar: React.FC<ShieldBarProps> = ({ currentAmount, targetAmount }) => {
  return (
    <ImageBackground source={ImageCoinBack as ImageSourcePropType} style={styles.background} resizeMode='stretch'>
      <View style={styles.container}>
        <Text style={styles.coinText}>{`${currentAmount}`}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    // width: '100%',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  container: {
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
    color: '#f00', 
  },
});

export default ShieldBar;
