import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LogoText from '../assets/Icons/Logos/LogoText.png';
import CardStack from '../components/CardStack';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topIcon}>
        <Image style={{ width: 120, height: 40 }} source={LogoText} />
      </View>
      <CardStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  }
});

export default HomeScreen;
