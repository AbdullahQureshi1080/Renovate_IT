//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
// import {Avatar, Divider} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';
//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';
import AppForm from '../../components/AppForm/AppForm';
import AppFormField from '../../components/AppForm/AppFormField';
import AppFormPicker from '../../components/AppForm/AppFormPicker';

//  Styles Import
import ScreenStyles from '../../styles/ScreenStyles';
import {Divider} from 'react-native-paper';
import SubmitButton from '../../components/AppForm/SubmitButton';

const {width, height} = Dimensions.get('screen');
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

const validationSchema = Yup.object().shape({
  address: Yup.string().required().min(1).label('Address'),
  city: Yup.object().required().label('City'),
  province: Yup.object().label('Province').required(),
  zipCode: Yup.number().required().label('Zip Code').max(100000),
  phoneNumber: Yup.string().matches(
    phoneRegExp,
    'Phone number is not valid, Number start with +92 or 03XX',
  ),
});

const locations = [
  {label: 'Islamabad', value: 1},
  {label: 'Rawalpindi', value: 2},
  {label: 'Multan', value: 3},
  {label: 'Lahore', value: 4},
  {label: 'Karachi', value: 5},
  {label: 'Faisalabad', value: 6},
  {label: 'Peshswar', value: 7},
  {label: 'Hyderabad', value: 8},
  {label: 'Kashmir', value: 9},
  {label: 'Jhelum', value: 10},
];

const provinces = [
  {label: 'Balochistan', value: 1},
  {label: 'Khyber Pakhtunkhwa', value: 2},
  {label: 'Sindh', value: 3},
  {label: 'Punjab', value: 4},
  {label: 'Islamadad Federal Territory', value: 5},
];

export default function DeliveryDetailScreen({navigation, route}) {
  const {product, totalOrderPrice, quantity} = route.params.data;
  //   const [counter, setCounter] = useState(1);
  //   const [total, setTotal] = useState(parseInt(product.productPrice));
  const nextHandler = (data) => {
    const {address, city, province, zipCode, phoneNumber} = data;
    console.log(
      'Data in Handle Next Form',
      address,
      city,
      province,
      zipCode,
      phoneNumber,
    );
    console.log(
      'Data from product details ',
      quantity,
      product,
      totalOrderPrice,
    );
    navigation.navigate('Order Confirmation', {
      data: {
        product: product,
        quantity: quantity,
        totalOrderPrice: totalOrderPrice,
        deliveryDetails: data,
      },
    });
  };

  const handleSubmit = ({address, city, province, zipCode, phoneNumber}) => {
    console.log(
      'Data from Form',
      address,
      city,
      province,
      zipCode,
      phoneNumber,
    );
    const data = {
      address,
      city,
      province,
      zipCode,
      phoneNumber,
    };
    nextHandler(data);
  };
  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <AppForm
            initialValues={{
              address: '',
              city: '',
              province: '',
              zipCode: '',
              phoneNumber: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Header
              navigation={navigation}
              idCheck={false}
              name={'Delivery Detail'}
              next={'Next'}
              onPressNext={nextHandler}
              renderButton={<SubmitButton name="Next" />}
            />
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
              }}
            >
              <AppText style={styles.labelText}>Address * </AppText>
              <AppFormField
                maxLength={255}
                name="address"
                placeholder="Address"
                numberOfLines={3}
                multiline={true}
              />
              <AppText style={styles.labelText}>City *</AppText>
              <AppFormPicker items={locations} name="city" placeholder="City" />
              <AppText style={styles.labelText}>Province *</AppText>
              <AppFormPicker
                items={provinces}
                name="province"
                placeholder="Province"
              />
              <AppText style={styles.labelText}>Zip Code *</AppText>
              <AppFormField
                keyboardType="numeric"
                maxLength={8}
                name="zipCode"
                placeholder="Zip Code"
              />
              <AppText style={styles.labelText}>Phone Number *</AppText>
              <AppFormField
                keyboardType="numeric"
                maxLength={8}
                name="phoneNumber"
                placeholder="03XX XXX XXXX"
              />
            </View>
          </AppForm>
          <Divider style={styles.divider} />
          <View style={styles.noteContainer}>
            <AppText style={styles.noteHead}>Note</AppText>
            <AppText style={styles.noteDescription}>
              You will receive a confirmation call about your order on the given
              phone number with delivery details. So provide an active number
              that is in use otherwise the order will be canceled.
            </AppText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    // marginVertical: 10,
  },
  labelText: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    opacity: 0.6,
  },

  divider: {
    marginVertical: 15,
    borderWidth: 0.5,
    opacity: 0.7,
  },
  noteContainer: {
    marginHorizontal: 20,
  },
  noteHead: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  noteDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
