import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ImageCard = ({ image, title, subtitle }) => {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />

            <View style={styles.overlay}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

export default ImageCard;

const styles = StyleSheet.create({
    card: {
        height: '70%',
        width: '85%',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    overlay: {
        position: 'absolute',
        bottom: 0,
        height: '15%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.57)',
        padding: 12,
        justifyContent: 'center',
    },

    title: {
        marginTop: -30,
        marginBottom: 10,
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },

    subtitle: {
        color: '#ddd',
        fontSize: 16,
    },
});
