import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import logo_cfcim from '../../public/logo-cfcim.png';
import bg from '../../public/background.jpg';
import sb from '../../public/notsub.png';

const Notsub = ({route, navigation}) => {
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
        <Image
          style={{
            width: '80%',
            height: 350,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={sb}
        />
        <Text style={style.text}>
          {route.params.adherent + ' '}
          <Text style={{fontWeight: 'normal', color: '#777'}}>
            n'est pas adhérent de{' '}
          </Text>
          <Text style={{color: '#0c4377'}}>CFCIM</Text>
        </Text>
        <View>
          <TouchableOpacity
            style={style.button}
            onPress={() => navigation.navigate('Index')}>
            <Text style={style.text1}>OK</Text>
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
    fontSize: 28,
    color: '#e40343',
    textAlign: 'center',
    bottom: 50,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e40343',
    borderRadius: 23,
    padding: 7,
    elevation: 10,
  },
});

export default Notsub;
