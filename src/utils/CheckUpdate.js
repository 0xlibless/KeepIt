import React, { useEffect, useState } from 'react';
import CustomAlert from '../components/CustomAlert';
import Constants from 'expo-constants';
import { Linking, useColorScheme } from 'react-native';

const CURRENT_VERSION = Constants.expoConfig.version;

const UpdateChecker = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [showAlert, setShowAlert] = useState(false);
    const [latestVersion, setLatestVersion] = useState(null);

    useEffect(() => {
        fetch('https://api.github.com/repos/AguuZzz/KeepIt/releases/latest')
            .then(res => res.json())
            .then(data => {
                if (data.name !== CURRENT_VERSION) {
                    console.log('Update detectado 🚀', data.name, CURRENT_VERSION);
                    setLatestVersion(data.name);
                    setShowAlert(true);
                }
            })
            .catch(err => console.log('Error chequeando update', err));
    }, []);

    return (
        <CustomAlert
            show={showAlert}
            title="Actualización disponible"
            message={`Actualiza la aplicación para obtener las últimas funcionalidades`}
            contentContainerStyle={{ backgroundColor: isDarkMode ? '#1e1e1e' : 'white' }}
            titleStyle={{ color: isDarkMode ? 'white' : 'black' }}
            messageStyle={{ color: isDarkMode ? '#eee' : 'black' }}
            showConfirmButton={true}
            confirmText="Actualizar"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
                setShowAlert(false);
                Linking.openURL('https://github.com/AguuZzz/KeepIt/releases/latest');
            }}
            onCancelPressed={() => setShowAlert(false)}
            isDarkMode={isDarkMode}
        />
    );
};

export default UpdateChecker;
