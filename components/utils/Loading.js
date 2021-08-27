import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import logo_qr from '../../public/qrcfcimiconT.png';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      <Image
        style={{
          width: '75%',
          height: 170,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginBottom: 50,
        }}
        source={logo_qr}
      />
      <ActivityIndicator size="large" color="#E54545" />
    </View>
  );
};

export default Loading;
