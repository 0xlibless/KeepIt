import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImageCard = ({ asset, isActive }) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLandscapeWindow = windowWidth > windowHeight;

    const [isMuted, setIsMuted] = useState(true);
    const toggleAudio = () => setIsMuted(prev => !prev);

    const dynamicCardStyle = {
        width: isLandscapeWindow ? '60%' : '85%',
        height: isLandscapeWindow ? '75%' : '70%',
    };

    const isVideo = asset.mediaType === 'video';
    const isHorizontal = asset.width > asset.height;
    const uri = asset.uri;
    const title = asset.filename;
    const subtitle = new Date(asset.creationTime).toLocaleDateString();

    const renderMedia = (resizeMode, style) => {
        if (isVideo) {
            return (
                <Video
                    source={{ uri }}
                    style={style || styles.image}
                    resizeMode={resizeMode}
                    isLooping
                    shouldPlay={isActive}
                    isMuted={isMuted}
                />
            );
        }
        return <Image source={{ uri }} style={style || styles.image} resizeMode={resizeMode} />;
    };

    return (
        <View style={[styles.card, dynamicCardStyle]}>
            {isHorizontal ? (
                <>
                    <View style={StyleSheet.absoluteFill}>

                        {renderMedia(ResizeMode.COVER, styles.blurBackground)}
                        <BlurView intensity={70} style={StyleSheet.absoluteFill} tint="dark" />
                    </View>
                    {renderMedia(ResizeMode.CONTAIN)}
                </>
            ) : (
                renderMedia(ResizeMode.COVER)
            )}

            <View style={styles.overlay}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            {isVideo && (
                <TouchableOpacity style={styles.muteButton} onPress={toggleAudio} activeOpacity={0.8}>
                    <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={20} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ImageCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    blurBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
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

    muteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
