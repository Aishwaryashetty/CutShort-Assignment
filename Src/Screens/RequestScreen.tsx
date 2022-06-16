import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
const RequestScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Request</Text>
      <View style={styles.viewBox}>
        <Image
          style={styles.userImage}
          source={require('../Assets/Trump_Circle.png')}
        />

        <Text style={styles.title}>Adeleke Roman</Text>
        <View style={styles.viewBalance}>
          <Text style={styles.textBody}>is requesting for:</Text>
          <Text style={styles.textBalance}>₦ 200,000</Text>
        </View>

        <TouchableOpacity style={[styles.button, {backgroundColor: '#e73e66'}]}>
          <Text style={[styles.textButton, {color: 'white'}]}>Send money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.textButton}>Dont send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1f47',
    alignItems: 'center',
  },
  viewBox: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
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
    fontSize: 15,
  },
  textButton: {
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#242c69',
  },
  viewBalance: {
    marginVertical: 40,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    marginVertical: 30,
  },
  addMoney: {
    fontSize: 15,
    textAlign: 'center',
    color: '#3757b8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: 150,
    borderColor: '#242c69',
    borderWidth: 1,
  },
  AddMoneyButton: {
    backgroundColor: '#242c69',
    borderRadius: 10,
    width: 100,
    padding: 7,
  },
  textBalance: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 30,
  },
});

export default RequestScreen;
