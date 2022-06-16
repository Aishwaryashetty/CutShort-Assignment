import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import BottomSheet from 'react-native-simple-bottom-sheet';
import {FlatGrid} from 'react-native-super-grid';

import * as Constants from '../Constants';

const SearchScreen = ({navigation}: any) => {
  const [viewSize, setViewSize] = useState({height: 0, width: 0});
  const [randomNumbers, setRandomNumbers] = useState([]);

  const onLayout = (event: any) => {
    const {height, width} = event.nativeEvent.layout;
    setViewSize({height, width});
    console.log('viewSize', viewSize);
  };

  useEffect(() => {
    let nums: any = [];
    let n = 6;
    Array(n).forEach(element => {
      let num = Math.floor(Math.random() * 30) + 1;
      if (nums.find(num)) {
        n = n + 1;
      } else {
        nums.push(num);
      }
    });
    console.log('nums', nums);
    setRandomNumbers(nums);
  }, [setRandomNumbers]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Search..."
        placeholderTextColor="#FFF"
      />
      <View onLayout={onLayout} style={styles.viewBox}>
        {Array(30).map((e, i) => {
          if (randomNumbers.find(i)) {
            <Image style={styles.userPic} source={item.image} />;
          }
        })}

        <FlatGrid
          itemDimension={50}
          data={Constants.DATA}
          style={styles.gridView}
          spacing={10}
          renderItem={({item, index}) => (
            <Image style={styles.userPic} source={item.image} />
          )}
        />
      </View>
      <BottomSheet
        isOpen
        wrapperStyle={styles.wrapperStyle}
        lineStyle={styles.lineStyle}>
        <View>
          <Image
            style={styles.userImage}
            source={require('../Assets/Trump_Circle.png')}
          />
          <Text style={[styles.title, {fontSize: 20, fontWeight: 'bold'}]}>
            Adeleke Roman
          </Text>
          <Text style={[styles.title, {fontSize: 15}]}>9123874650</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#e73e66'}]}>
            <Text style={[styles.textButton, {color: 'white'}]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#3ecfb8',
    alignSelf: 'center',
    borderRadius: 5,
  },
  gridView: {
    margin: -10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0d1f47',
    padding: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    marginVertical: 15,
    alignSelf: 'center',
  },
  listItem: {
    backgroundColor: '#0d1f47',
    alignItems: 'center',
    width: '100%',
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPic: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    margin: 5,
  },
  textColor: {
    color: 'white',
  },
  sortView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  menuView: {
    backgroundColor: '#242c69',
    padding: 8,
    borderRadius: 20,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  wrapperStyle: {
    backgroundColor: '#101a4e',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    padding: 5,
    alignSelf: 'center',
  },
  statusView: {
    borderRadius: 20,
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  transactionStatus: {
    fontSize: 10,
    color: '#FFF',
    padding: 5,
    fontWeight: 'bold',
  },
  transactionName: {
    fontSize: 15,
    color: '#3757b8',
    padding: 5,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewMargin: {
    margin: 5,
  },
  lineStyle: {
    backgroundColor: '#3757b8',
  },
  textBody: {
    color: 'white',
    padding: 5,
    fontSize: 15,
    alignSelf: 'flex-end',
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
  viewBox: {
    backgroundColor: 'green',
    flex: 0.6,
    margin: 10,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginVertical: 15,
    padding: 10,
    alignSelf: 'center',
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown2BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#101a4e',
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
  },
  sortText: {
    color: '#3757b8',
    alignSelf: 'center',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#101a4e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: '#101a4e',
    borderBottomColor: '#C5C5C5',
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SearchScreen;
