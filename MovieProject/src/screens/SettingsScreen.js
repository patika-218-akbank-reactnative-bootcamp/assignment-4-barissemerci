import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ThemeContext} from '../context/theme';

const SettingsScreen = () => {
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation();

  function navigateEditProfileScreen() {
    navigation.navigate('EditProfileScreen');
  }

  function navigateThemeOptionsScreen() {
    navigation.navigate('ThemeOptionsScreen');
  }

  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const clearStore = () => {
    try {
      AsyncStorage.removeItem('user').then(dispatch(setUser(null)));
    } catch (e) {
      console.log(e);
    }
  };

  function handleLogout() {
    clearStore();

    console.log('logoutuser', user);
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Image
        style={styles.imageStyle}
        source={{uri: 'https://picsum.photos/id/7/150/150'}}
      />
      <TouchableOpacity
        onPress={navigateThemeOptionsScreen}
        style={[styles.buttonContainer, {borderColor: theme.fontColor}]}>
        <Text style={[styles.buttonTextStyle, {color: theme.fontColor}]}>
          Theme
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateEditProfileScreen}
        style={[styles.buttonContainer, {borderColor: theme.fontColor}]}>
        <Text style={[styles.buttonTextStyle, {color: theme.fontColor}]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.logOutButtonContainer, {borderColor: theme.fontColor}]}>
        <Text
          style={[styles.buttonTextStyle, {color: theme.fontColor}]}
          onPress={handleLogout}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 100,
  },
  buttonContainer: {
    borderWidth: 2,
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  logOutButtonContainer: {
    borderWidth: 2,
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
export default SettingsScreen;
