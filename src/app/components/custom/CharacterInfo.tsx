import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CharacterInfoProps {
  name: string;
  level: number;
  defencePower: number;
  onAttack: () => void;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ name, level, defencePower, onAttack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.levelText}>Level: {level}</Text>
        <Text style={styles.defenceText}>Shield: {defencePower}</Text>
      </View>
      <TouchableOpacity style={styles.attackButton} onPress={onAttack}>
        <Text style={styles.attackText}>ATTACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5', // Light background for contrast
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ff4757', // Distinct border color for a game feel
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0,
  },
  nameText: {
    fontSize: 18,
    color: '#333', // Darker text color for contrast against light container
    fontWeight: 'bold',
    width: '35%',
  },
  infoContainer: {
    width: '30%',
  },
  levelText: {
    fontSize: 18,
    color: '#0dcaf0', // Bright color for level to keep a game-like appearance
    fontWeight: '600',
    marginBottom: 5,
  },
  defenceText: {
    fontSize: 18,
    color: '#ffa502', // Vibrant color for defence
    fontWeight: '600',
  },
  attackButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ff6b81',
    borderRadius: 10,
    alignItems: 'center',
  },
  attackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CharacterInfo;
