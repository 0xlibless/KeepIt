import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Animated,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomAlert = ({
    show,
    title,
    message,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    showCancelButton = false,
    showConfirmButton = true,
    confirmButtonColor = '#DD6B55',
    onConfirmPressed,
    onCancelPressed,
    isDarkMode = false,
    contentContainerStyle,
    titleStyle,
    messageStyle
}) => {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        if (show) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }).start();
        } else {
            scaleAnim.setValue(0.9);
        }
    }, [show]);

    if (!show) return null;

    const styles = createStyles(isDarkMode, confirmButtonColor);

    return (
        <Modal
            transparent
            visible={show}
            animationType="fade"
            onRequestClose={onCancelPressed}
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={onCancelPressed}>
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
                </TouchableWithoutFeedback>

                <Animated.View style={[
                    styles.alertContainer,
                    contentContainerStyle,
                    { transform: [{ scale: scaleAnim }] }
                ]}>
                    <View style={styles.content}>
                        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
                        {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
                    </View>

                    <View style={styles.buttonContainer}>
                        {showCancelButton && (
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onCancelPressed}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelButtonText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        {showConfirmButton && (
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={onConfirmPressed}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.confirmButtonText}>{confirmText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const createStyles = (isDarkMode, confirmButtonColor) => StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        width: width * 0.8,
        backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
        borderRadius: 12,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    content: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? 'white' : '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: isDarkMode ? '#eee' : '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: confirmButtonColor || '#DD6B55',
    },
    cancelButton: {
        backgroundColor: '#D0D0D0',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CustomAlert;
