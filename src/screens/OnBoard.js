import { Image } from 'react-native';
import { OnboardFlow } from 'react-native-onboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/Icons/Logos/Logo.png';
import Page2 from '../assets/OnBoard/Page2.png';
import Page3 from '../assets/OnBoard/Page3.png';

const OnBoard = ({ navigation }) => {
    const handleDone = async () => {
        try {
            await AsyncStorage.setItem('alreadyLaunched', 'true');
            navigation.replace('KeepIt');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <OnboardFlow
            pages={[
                {
                    title: 'Bienvenido a KeepIt',
                    subtitle: 'Decidí en segundos qué fotos se quedan y cuáles se van',
                    imageUri: Image.resolveAssetSource(Logo).uri,
                    primaryButtonTitle: 'Ok',
                },
                {
                    title: 'Elije de manera sencilla, sin perder el tiempo',
                    subtitle: 'Izquierda se va, derecha se queda',
                    imageUri: Image.resolveAssetSource(Page2).uri,
                    primaryButtonTitle: 'Ok'
                },
                {
                    title: 'No te preocupes si cometes un error',
                    subtitle: 'Las imagenes quedaran en papelera durante 30 dias',
                    imageUri: Image.resolveAssetSource(Page3).uri,
                    primaryButtonTitle: 'Comenzar'
                }
            ]}
            type={'fullscreen'}
            onDone={handleDone}
        />
    );
};

export default OnBoard;
