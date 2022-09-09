import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconMovie from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUser} from '../redux/user';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ThemeContext} from '../context/theme';

const LoginScreen = props => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    if (isFocused) {
      getUsers();
      console.log('Login Screen tetiklendi');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const navigation = useNavigation();

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('user', jsonValue);

      console.log("LoginScreen AsyncStorage'a atıldı:", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  function getUsers() {
    fetch('http://10.0.2.2:3000/users').then(async result => {
      const data = await result.json();
      setUsers(data);
      console.log("LoginScreen JSON-SERVER'dan users çekildi:", users);
    });
  }

  function navigateSignupScreen() {
    navigation.navigate('SignupScreen');
  }

  function handleLogin() {
    const user = users.filter(item => {
      return item.username === username && item.password === password;
    });

    if (user.length === 1) {
      storeData(user);

      console.log("LoginScreen Redux'a atıldı user:", JSON.stringify(user));
      dispatch(setUser(JSON.stringify(user)));
      showMessage({
        message: 'Welcome',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Wrong credentials',
        type: 'danger',
      });
    }
  }

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <IconMovie
          style={styles.iconMovieStyle}
          color={theme.fontColor}
          size={200}
          name="movie"
        />

        <TextInput
          value={username}
          onChangeText={usernameLogin => setUserName(usernameLogin)}
          placeholder="Username"
          placeholderTextColor={theme.fontColor}
          style={[
            styles.textInput,
            {color: theme.fontColor, borderColor: theme.fontColor},
          ]}
        />

        <TextInput
          value={password}
          onChangeText={passwordLogin => setPassword(passwordLogin)}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={theme.fontColor}
          style={[
            styles.textInput,
            {color: theme.fontColor, borderColor: theme.fontColor},
          ]}
        />
        <View style={[styles.buttonStyle, {borderColor: theme.fontColor}]}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.buttonTextStyle, {color: theme.fontColor}]}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={navigateSignupScreen}>
          <Text style={[styles.signUpTextStyle, {color: theme.active}]}>
            New to ...? SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  textInput: {
    padding: 10,
    width: 270,
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    marginTop: 20,
  },
  buttonStyle: {
    borderWidth: 2,
    width: 270,
    height: 50,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  iconMovieStyle: {
    marginTop: 150,
  },
  signUpTextStyle: {
    color: 'blue',
  },
});
export default LoginScreen;
