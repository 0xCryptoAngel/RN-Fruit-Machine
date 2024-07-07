import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageSourcePropType, Dimensions } from 'react-native';
import ColorBlock from '../custom/ColorBlock';

interface TowerProps {
    level?: any;
    blocks?: any;
    backgroundImage?: any;
}

const Tower: React.FC<TowerProps> = ({ level, blocks, backgroundImage }) => {
    const screnWidth = Dimensions.get('window').width;
    const totalBlock = 40 * 10;
    const [size, setSize] = useState({ // block size
        width: 70,
        height: 70
    });
    const [columns, setColumns] = useState(1);
    const [rows, setRows] = useState(10);
    const [scale, setScale] = useState(1);

    const blockArr: number[] = Array(level * 10 / scale || 10).fill(0).map((_, i) => i);

    useEffect(() => {
        let temp_scale = 1;
        if (level <= 5) {
            temp_scale = 1;
            setScale(1);
            setColumns(level)
        } else {
            temp_scale = 10;
            setScale(10);
            setColumns(Math.ceil(level / 10))
        }

    }, [level])

    return (
        <ScrollView contentContainerStyle={[styles.container, { width: columns * (size.width + 2) }]}>
            {blockArr.map((item, index) => index < blocks / scale ? (
                <ColorBlock level={level} text={level} color={`rgba(255, 0, 0, 0.5)`} style={{ ...size }} />
            ) : (
                <ColorBlock level={''} text={''} style={{ ...size }} />
            ))}
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        paddingVertical: 50,
        // width: '80%'
    },
    containerColumn: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    background: {
        // width: '100%',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3,
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

export default Tower;
