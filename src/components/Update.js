import React, { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import Constants from 'expo-constants';
import { Linking } from 'react-native';

const CURRENT_VERSION = Constants.expoConfig.version;

const UpdateChecker = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [latestVersion, setLatestVersion] = useState(null);

    useEffect(() => {
        fetch('https://api.github.com/repos/AguuZzz/KeepIt/releases/latest')
            .then(res => res.json())
            .then(data => {
                if (data.name == CURRENT_VERSION) {
                    console.log('Update detectado 🚀', data.name, CURRENT_VERSION);
                    setLatestVersion(data.name);
                    setShowAlert(true);
                }
            })
            .catch(err => console.log('Error chequeando update', err));
    }, []);

    return (
        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Actualización disponible"
            message={`Actualiza la aplicación para obtener las últimas funcionalidades`}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Actualizar"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
                setShowAlert(false);
                Linking.openURL('https://github.com/AguuZzz/KeepIt/releases/latest');
            }}
        />
    );
};

export default UpdateChecker;
