import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import ImagegemBack from '../../../static/assets/crystal_counter.png';

interface GemBarProps {
  gemAmount: number;
  gemIcon?: any; 
  backgroundImage?: any; 
}

const GemBar: React.FC<GemBarProps> = ({ gemAmount, gemIcon, backgroundImage }) => {
  return (
    <ImageBackground source={ImagegemBack as ImageSourcePropType} style={styles.background} resizeMode='contain'>
      <View style={styles.container}>
        <Image source={gemIcon} style={styles.gemIcon} />
        <Text style={styles.gemText}>{`${gemAmount}`}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gemIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  gemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default GemBar;
