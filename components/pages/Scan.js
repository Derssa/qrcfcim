import React, {useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import bg from '../../public/background.jpg';
import qrM from '../../public/qrM.png';
import Loading from '../utils/Loading';

const Scan = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async e => {
    let cltScanned;
    setIsLoading(true);
    try {
      cltScanned = JSON.parse(e.data);
    } catch (err) {
      setIsLoading(false);
      return navigation.navigate('Fail');
    }

    try {
      const res = await axios.post(
        `http://192.168.8.70:5000/api/visites/addvisite`,
        {clt: cltScanned.clt},
        {
          headers: {Authorization: route.params.token},
        },
      );
      navigation.navigate('Success', {adherent: res.data.adherent});
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response.data.msg === "Ce adhérant n'existe pas") {
        navigation.navigate('Fail');
      } else if (err.response.data.msg === "n'est pas adhérant") {
        navigation.navigate('Notsub', {adherent: err.response.data.adherent});
      } else {
        await AsyncStorage.removeItem('firstLogin');
        await AsyncStorage.removeItem('user');
        navigation.navigate('Auth');
      }
    }

    /*Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );*/
  };

  return (
    <ImageBackground source={bg} style={styles.bgImage}>
      {isLoading ? (
        <Loading />
      ) : (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          reactivate={true}
          showMarker={true}
          topContent={
            <Text style={styles.centerText}>
              Scannez <Text style={styles.textBold}>le QRCode d'adhérent</Text>
              {'\n'}
              <Text
                style={{fontWeight: 'bold', color: '#0c4377', fontSize: 24}}>
                CFCIM
              </Text>
            </Text>
          }
          bottomContent={
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => navigation.navigate('Index')}>
              <Text style={styles.buttonText}>Retourner</Text>
            </TouchableOpacity>
          }
          customMarker={
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              source={qrM}
            />
          }
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 20,
    padding: 32,
    color: '#777',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonTouchable: {
    marginTop: 55,
    padding: 16,
    backgroundColor: '#e40343',
    borderRadius: 20,
    elevation: 10,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

AppRegistry.registerComponent('default', () => Scan);

export default Scan;
