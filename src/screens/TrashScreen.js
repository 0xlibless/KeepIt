import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTrash, removeFromTrash, clearTrash } from '../utils/TrashManager';
import { deleteFile } from '../utils/DeleteFile';
import AwesomeAlert from 'react-native-awesome-alerts';


const TrashScreen = ({ navigation }) => {
    const [trashItems, setTrashItems] = useState([]);
    const [alert, setAlert] = useState({
        show: false,
        title: '',
        message: '',
        showCancelButton: false,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        onConfirm: () => { },
        onCancel: () => { }
    });

    const triggerAlert = (title, message, options = {}) => {
        setAlert({
            show: true,
            title,
            message,
            showCancelButton: options.showCancelButton || false,
            confirmText: options.confirmText || 'Aceptar',
            cancelText: options.cancelText || 'Cancelar',
            onConfirm: () => {
                if (options.onConfirm) options.onConfirm();
                setAlert(prev => ({ ...prev, show: false }));
            },
            onCancel: () => {
                if (options.onCancel) options.onCancel();
                setAlert(prev => ({ ...prev, show: false }));
            }
        });
    };

    useEffect(() => {
        loadTrash();
    }, []);

    const loadTrash = async () => {
        const items = await getTrash();
        setTrashItems(items);
    };

    const handleRestore = async (item) => {
        await removeFromTrash(item.id);
        loadTrash();
        triggerAlert('Restaurado', 'La foto ha sido quitada de la papelera.');
    };

    const handleEmptyTrash = async () => {
        if (trashItems.length === 0) return;

        triggerAlert(
            'Vaciar Papelera',
            '¿Estás seguro? Esto eliminará las fotos permanentemente de tu dispositivo.',
            {
                showCancelButton: true,
                confirmText: 'Eliminar Todo',
                onConfirm: async () => {
                    const success = await deleteFile(trashItems);
                    if (success) {
                        await clearTrash();
                        loadTrash();
                        triggerAlert('Éxito', 'Papelera vaciada.');
                    } else {
                        triggerAlert('Error', 'No se pudieron eliminar las fotos. Permite que la aplicación pueda deshacerse de ellas');
                    }
                }
            }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity
                style={styles.restoreButton}
                onPress={() => handleRestore(item)}
            >
                <Ionicons name="refresh-circle" size={30} color="#4CAF50" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Papelera ({trashItems.length})</Text>
                <TouchableOpacity onPress={handleEmptyTrash}>
                    <Ionicons name="trash-outline" size={28} color="red" />
                </TouchableOpacity>
            </View>

            {trashItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>La papelera está vacía</Text>
                </View>
            ) : (
                <FlatList
                    data={trashItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                />
            )}

            <AwesomeAlert
                show={alert.show}
                showProgress={false}
                title={alert.title}
                message={alert.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={alert.showCancelButton}
                showConfirmButton={true}
                cancelText={alert.cancelText}
                confirmText={alert.confirmText}
                confirmButtonColor="#DD6B55"
                onCancelPressed={alert.onCancel}
                onConfirmPressed={alert.onConfirm}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingTop: 50 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    list: { paddingHorizontal: 5 },
    itemContainer: {
        flex: 1 / 3,
        aspectRatio: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
    },
    image: { width: '100%', height: '100%' },
    restoreButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15
    },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: 'grey' }
});

export default TrashScreen;
