//  Native Imports
import React, {useState} from 'react';
import StoreNavigator from '../../navigation/StoreNavigator.js';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export default function StoreHome({navigation}) {
  return <StoreNavigator navigation={navigation} />;
}
