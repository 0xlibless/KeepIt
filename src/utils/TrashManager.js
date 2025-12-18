import AsyncStorage from '@react-native-async-storage/async-storage';

const TRASH_KEY = 'keepit_virtual_trash';

export const addToTrash = async (photo) => {
    try {
        const currentTrash = await getTrash();
        // Evitar duplicados
        if (currentTrash.some(p => p.id === photo.id)) return true;

        const updatedTrash = [...currentTrash, photo];
        await AsyncStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
        return true;
    } catch (error) {
        console.error('Error adding to trash:', error);
        return false;
    }
};

export const getTrash = async () => {
    try {
        const trash = await AsyncStorage.getItem(TRASH_KEY);
        return trash ? JSON.parse(trash) : [];
    } catch (error) {
        console.error('Error getting trash:', error);
        return [];
    }
};

export const removeFromTrash = async (photoId) => {
    try {
        const currentTrash = await getTrash();
        const updatedTrash = currentTrash.filter(p => p.id !== photoId);
        await AsyncStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
        return true;
    } catch (error) {
        console.error('Error removing from trash:', error);
        return false;
    }
};

export const clearTrash = async () => {
    try {
        await AsyncStorage.removeItem(TRASH_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing trash:', error);
        return false;
    }
};
