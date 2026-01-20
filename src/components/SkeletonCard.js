import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    useAnimatedStyle,
    Easing
} from 'react-native-reanimated';

const SkeletonCard = () => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLandscapeWindow = windowWidth > windowHeight;

    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.7, { duration: 1000, easing: Easing.ease }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const dynamicCardStyle = {
        width: isLandscapeWindow ? '60%' : '85%',
        height: isLandscapeWindow ? '75%' : '70%',
    };

    return (
        <View style={[styles.card, dynamicCardStyle]}>
            <Animated.View style={[styles.imagePlaceholder, animatedStyle]} />

            <View style={styles.overlay}>
                <Animated.View style={[styles.textBar, { width: '60%', height: 24, marginBottom: 10 }, animatedStyle]} />
                <Animated.View style={[styles.textBar, { width: '40%', height: 16 }, animatedStyle]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
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
    textBar: {
        backgroundColor: '#555',
        borderRadius: 4,
    }
});

export default SkeletonCard;
