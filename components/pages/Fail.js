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
import fl from '../../public/failed.png';

const Fail = ({navigation}) => {
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
            width: '65%',
            height: 350,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={fl}
        />
        <Text style={style.text}>
          QRCode{' '}
          <Text style={{fontWeight: 'normal', color: '#777'}}>
            non reconnu{' '}
          </Text>
        </Text>
        <View style={style.buttons}>
          <TouchableOpacity
            style={style.button}
            onPress={() => navigation.navigate('Index')}>
            <Text style={style.text1}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button1}
            onPress={() => navigation.navigate('Scan')}>
            <Text style={style.text1}>Réessayer</Text>
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
    color: '#0c4377',
    textAlign: 'center',
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e40343',
    borderRadius: 23,
    padding: 7,
    elevation: 10,
    marginRight: 7,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#0c4377',
    borderRadius: 23,
    padding: 7,
    elevation: 10,
    marginLeft: 7,
  },
});

export default Fail;
