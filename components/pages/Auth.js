import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import logo_cfcim from '../../public/logo-cfcim.png';
import logo_qr from '../../public/qrcfcimiconT.png';
import bg from '../../public/background.jpg';
import {isEmpty, isEmail} from '../utils/validation/Validation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../utils/Loading';

const Login = ({navigation}) => {
  const [auth, setAuth] = useState({email: '', password: ''});
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const handleInputChange = (text, from) => {
    setErr('');
    setAuth({...auth, [from]: text});
  };
  const handleSubmit = async () => {
    if (isEmpty(auth.email) || isEmpty(auth.password)) {
      return setErr('Merci de remplir tous les champs');
    }
    if (!isEmail(auth.email)) {
      return setErr('Enter un email valide');
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`http://192.168.8.70:5000/api/user/login`, {
        email: auth.email,
        password: auth.password,
      });

      await AsyncStorage.setItem('firstLogin', JSON.stringify(true));
      await AsyncStorage.setItem('user', res.data.userName);

      setAuth({email: '', password: ''});
      navigation.navigate('Index');
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ImageBackground source={bg} style={styles.bgImage}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Image
              style={{
                width: '75%',
                height: 170,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={logo_qr}
            />
            <View style={{flex: 0, flexDirection: 'column', width: '100%'}}>
              {err !== '' && (
                <Text
                  style={{
                    color: '#E54545',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                    textAlign: 'center',
                    alignSelf: 'center',
                    width: '90%',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  *{err}
                </Text>
              )}
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.textInput}
                value={auth.email}
                onChangeText={text => handleInputChange(text, 'email')}
              />
              <TextInput
                secureTextEntry={true}
                placeholder="Mot de passe"
                style={styles.textInput}
                onChangeText={text => handleInputChange(text, 'password')}
                value={auth.password}
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    letterSpacing: 1,
                  }}>
                  CONNECTER
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'column',
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#e40343',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 10,
                }}>
                "Votre Business Partner"
              </Text>
              <Image
                style={{
                  width: '60%',
                  height: 60,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={logo_cfcim}
              />
            </View>
          </>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    padding: 7,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#e40343',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default Login;
