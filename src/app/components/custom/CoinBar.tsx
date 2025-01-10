import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import ImageCoinBack from '../../../static/assets/coin-bar.png';

interface CoinBarProps {
  coinAmount: number;
  coinIcon?: any; 
  backgroundImage?: any; 
}

const CoinBar: React.FC<CoinBarProps> = ({ coinAmount, coinIcon, backgroundImage }) => {
  return (
    <ImageBackground source={ImageCoinBack as ImageSourcePropType} style={styles.background} resizeMode='stretch'>
      <View style={styles.container}>
        <Image source={coinIcon} style={styles.coinIcon} />
        <Text style={styles.coinText}>{coinAmount}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    // width: 300,
    height: 50,
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
    color: '#fff', 
  },
});

export default CoinBar;
