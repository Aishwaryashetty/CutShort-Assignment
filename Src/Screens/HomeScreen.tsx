import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
} from 'react-native';

import BottomSheet from 'react-native-simple-bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Constants from '../Constants';
import * as StoreServices from '../Services/StoreServices';

const HomeScreen = ({navigation}: any) => {
  const [data, setData] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const filterOptions = ['Recent', 'Sent', 'Received', 'Failed'];
  const [localBalance, setLocalBalance] = useState(0);

  useEffect(() => {
    console.log('useEffect');
    async function getDefaultValues() {
      let details = await StoreServices.get(Constants.Enums.TransactionData);
      let balance = await StoreServices.get(Constants.Enums.CurrentBalance);
      if (!currentBalance != balance) {
        setData(details);
        setFilteredData(details);
        setCurrentBalance(balance);
      }
    }
    getDefaultValues();
  }, [currentBalance]);

  const renderItem = ({item, index}: any) => {
    let status = SetStatus(item.status);
    return (
      <View
        style={[
          styles.item,
          {backgroundColor: index % 2 == 0 ? '#101a4e' : '#242c69'},
        ]}>
        <View style={styles.viewBox}>
          <Image style={styles.userPic} source={item.image} />
          <View style={styles.viewMargin}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <View
              style={[
                styles.statusView,
                {
                  backgroundColor: status.color,
                },
              ]}>
              <Ionicons name={status.icon} color="#FFF" size={20} />
              <Text style={styles.transactionStatus}>{item.status}</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.transactionAmount, {color: status.color}]}>
          ₦ {item.amount}
        </Text>
      </View>
    );
  };

  const SetStatus = (status: string) => {
    let Status = {color: '', icon: ''};
    switch (status) {
      case 'Sent':
        Status.color = '#fdb237';
        Status.icon = 'person-remove-sharp';
        break;
      case 'Failed':
        Status.color = '#fe4a54';
        Status.icon = 'alert-sharp';
        break;
      case 'Received':
        Status.color = '#3ecfb8';
        Status.icon = 'person-add-sharp';
        break;
    }
    return Status;
  };

  const sortTransaction = (sortValue: string) => {
    if (sortValue == 'Recent') {
      setFilteredData(data);
      return;
    }
    let sortedArray = data.filter(x => x.status == sortValue);
    setFilteredData(sortedArray);
  };

  const addMoney = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please enter the amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value: any) => {
                setLocalBalance(currentBalance + Number(value));
              }}
              placeholder="Search..."
              placeholderTextColor="#FFF"
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={async () => {
                setModalVisible(!modalVisible);
                setCurrentBalance(localBalance);
                await StoreServices.store(
                  Constants.Enums.CurrentBalance,
                  localBalance,
                );
              }}
              style={styles.AddMoneyButton}>
              <Text style={styles.addMoney}>Add money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {addMoney()}
        <View style={styles.header}>
          <View style={styles.helloUser}>
            <View style={styles.menuView}>
              <Ionicons name="menu-sharp" color="#e73e66" size={20} />
            </View>
            <Text style={styles.title}>Hello Sandra,</Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.AddMoneyButton}>
            <Text style={styles.addMoney}>Add money</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBalance}>
          <Text style={styles.textBody}>Your current balance is</Text>
          <Text style={styles.textBalance}>
            {currentBalance.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
        <View style={styles.viewBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Request')}
            style={styles.button}>
            <Text style={styles.textButton}>Request money</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={styles.button}>
            <Text style={styles.textButton}>Send money</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        isOpen
        wrapperStyle={styles.wrapperStyle}
        lineStyle={styles.lineStyle}>
        <View>
          <View style={styles.transactionHeader}>
            <Text style={styles.textColor}>All Transactions </Text>
            <View style={styles.sortView}>
              <Text style={styles.sortText}>Sort by:</Text>
              <SelectDropdown
                data={filterOptions}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                  sortTransaction(selectedItem);
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem;
                }}
                rowTextForSelection={item => {
                  return item;
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <Ionicons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color="#FFF"
                      size={15}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />
            </View>
          </View>
          <FlatList
            style={{marginBottom: 50}}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => 'key' + index}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1f47',
    padding: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: '#3ecfb8',
    alignSelf: 'center',
    borderRadius: 5,
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
  modalText: {
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '70%',
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
  wrapperStyle: {
    backgroundColor: '#101a4e',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: '45%',
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
    fontSize: 50,
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

export default HomeScreen;
