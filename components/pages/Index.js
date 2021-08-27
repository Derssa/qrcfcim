import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo_cfcim from '../../public/logo-cfcim.png';
import bar from '../../public/bar.png';
import desc from '../../public/desc.png';
import bg from '../../public/background.jpg';

const Index = ({route, navigation}) => {
  const [user, setuser] = useState('');

  useEffect(async () => {
    setuser(await AsyncStorage.getItem('user'));
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={style.container}>
      <ImageBackground source={bg} style={style.bgImage}>
        <Image
          style={{
            width: '75%',
            height: 60,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={logo_cfcim}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 13,
            color: '#444',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          Bienvenue{' '}
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 13,
              color: '#0c4377',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            {user}
          </Text>
        </Text>
        <Image
          style={{
            width: '95%',
            height: 300,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={desc}
        />
        <View>
          <Text style={style.text1}>Scannez ici:</Text>
          <TouchableOpacity
            style={style.button}
            onPress={() =>
              navigation.navigate('Scan', {token: route.params.token})
            }>
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              source={bar}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e40343',
    textAlign: 'center',
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e40343',
    borderRadius: 23,
    padding: 7,
    marginTop: 13,
    elevation: 20,
  },
});

export default Index;
