import React from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import * as Constants from '../Constants';
import * as StoreServices from '../Services/StoreServices';

const StartUpScreen = ({navigation}: any) => {
  useEffect(() => {
    StoreServices.store(Constants.Enums.TransactionData, Constants.DATA);
    StoreServices.store(
      Constants.Enums.CurrentBalance,
      Constants.currentBalance,
    );
  });

  return (
    <ImageBackground
      source={require('../Assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.viewBox}>
        <Text style={styles.title}>Transfer that is safe</Text>
        <Text style={styles.textBody}>
          You got nothing to be scared about, we got you covered
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.textButton}>Start banking</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 20,
  },
  textBody: {
    color: 'white',
    padding: 5,
  },
  textButton: {
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewBox: {
    backgroundColor: Constants.backgroundColor,
    position: 'absolute',
    bottom: 0,
    padding: 50,
    borderTopRightRadius: 50,
    width: '90%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    alignSelf: 'flex-start',
  },
});

export default StartUpScreen;
