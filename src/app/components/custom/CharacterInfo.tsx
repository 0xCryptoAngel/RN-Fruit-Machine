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
      <Text style={styles.text}>{name}</Text>
      <View>
        <Text style={styles.leveltText}>Level: {level}</Text>
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
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 24,
    marginVertical: 5,
    color: '#ab7fff',
    fontWeight: 'bold',
    width: '30%',
  },
  leveltText: {
    fontSize: 16,
    color: '#699dfc',
    fontWeight: '700',
  },
  defenceText: {
    fontSize: 16,
    color: '#fb6c23',
    fontWeight: '700',

  },
  attackButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#03dddf',
    borderRadius: 5,
    width: 150,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  attackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default CharacterInfo;
