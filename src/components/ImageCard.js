import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';

const ImageCard = ({ asset, isActive }) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLandscapeWindow = windowWidth > windowHeight;

    const [isMuted, setIsMuted] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const videoRef = useRef(null);

    const toggleAudio = () => setIsMuted(prev => !prev);
    const toggleMenu = () => setShowMenu(prev => !prev);

    const handleShare = async () => {
        try {
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(asset.uri);
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
        setShowMenu(false);
    };

    const handleOpenGallery = async () => {
        try {
            await IntentLauncher.startActivityAsync(
                'android.intent.action.VIEW',
                {
                    data: asset.uri,
                    flags: 1,
                }
            );
        } catch (e) {
            console.error(e);
        }

        setShowMenu(false);
    };

    const dynamicCardStyle = {
        width: isLandscapeWindow ? '60%' : '85%',
        height: isLandscapeWindow ? '75%' : '70%',
    };

    const isVideo = asset.mediaType === 'video';
    const isHorizontal = asset.width > asset.height;
    const uri = asset.uri;
    const title = asset.filename;
    const subtitle = new Date(asset.creationTime).toLocaleDateString();

    const renderMedia = (resizeMode, style, isBackground = false) => {
        if (isVideo) {
            if (isBackground) {
                return <Image source={{ uri }} style={style || styles.image} resizeMode={resizeMode} />;
            }
            return (
                <Video
                    ref={videoRef}
                    source={{ uri }}
                    style={style || styles.image}
                    resizeMode={resizeMode}
                    isLooping={true}
                    shouldPlay={isActive}
                    isMuted={isMuted}
                    onError={(e) => console.log("Video Error:", e)}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            videoRef.current?.setPositionAsync(0);
                            videoRef.current?.playAsync();
                        }
                    }}
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
                        {renderMedia(ResizeMode.COVER, styles.blurBackground, true)}
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

            <TouchableOpacity style={styles.optionButton} onPress={toggleMenu} activeOpacity={0.8}>
                <Ionicons name="ellipsis-horizontal" size={20} color="black" />
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
                        <Ionicons name="share-outline" size={20} color="#333" />
                        <Text style={styles.menuText}>Compartir</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.menuItem} onPress={handleOpenGallery}>
                        <Ionicons name="images-outline" size={20} color="#333" />
                        <Text style={styles.menuText}>Galería</Text>
                    </TouchableOpacity>
                </View>
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

    optionButton: {
        position: 'absolute',
        top: 15,
        left: 15,
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

    menu: {
        position: 'absolute',
        top: 60,
        left: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 5,
        zIndex: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        minWidth: 140,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },

    menuText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },

    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 10,
    },
});
