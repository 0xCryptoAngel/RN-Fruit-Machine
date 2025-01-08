import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import ImageCoinBack from '../../../static/assets/block_counter.png';
import ProgressBar from './ProgressBar';

interface BlockBarProps {
  currentAmount: number;
  targetAmount?: any;
}

const BlockBar: React.FC<BlockBarProps> = ({ currentAmount, targetAmount }) => {
  return (
    <ImageBackground source={ImageCoinBack as ImageSourcePropType} style={styles.background} resizeMode='stretch'>
      <View style={styles.container}>
        <ProgressBar progress={currentAmount / targetAmount * 100} label={`${currentAmount}/${targetAmount}`} />
        {/* <Text style={styles.coinText}>{`${currentAmount}/${targetAmount}`}</Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    // width: '100%',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  container: {
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
});

export default BlockBar;
