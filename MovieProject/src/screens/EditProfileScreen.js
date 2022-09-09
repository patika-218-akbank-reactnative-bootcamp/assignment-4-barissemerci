import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {ThemeContext} from '../context/theme';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const EditProfileScreen = props => {
  const {user} = useSelector(state => state.user);
  const [id] = useState(JSON.parse(user)[0].id);
  const [username, setUserName] = useState(JSON.parse(user)[0].username);
  const [mail, setMail] = useState(JSON.parse(user)[0].mail);
  const [password, setPassword] = useState(JSON.parse(user)[0].password);
  const {theme} = useContext(ThemeContext);

  console.log("EditProfileScreen Redux'tan çekildi user:", JSON.parse(user));
  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('user', jsonValue);
      console.log("EditProfileScreen AsyncStorage'a atıldı:", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
      mail: mail,
    }),
  };

  const handleUser = userNew => {
    const list = [];
    list.push(userNew);
    dispatch(setUser(JSON.stringify(list))); //redux

    console.log("EditProfileScreen Redux'a atıldı:", JSON.stringify(list));

    storeData(list); //asyncstorage
    fetch('http://10.0.2.2:3000/users/' + id, requestOptions); //json-server

    showMessage({
      message: 'Saved successfully',
      type: 'success',
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.textInputs}>
        <Text style={[styles.textStyle, {color: theme.fontColor}]}>
          User Name
        </Text>
        <TextInput
          value={username}
          onChangeText={usernameNew => setUserName(usernameNew)}
          style={[
            styles.textInputStyles,
            {borderColor: theme.fontColor, color: theme.fontColor},
          ]}
        />
        <Text style={[styles.textStyle, {color: theme.fontColor}]}>Mail</Text>
        <TextInput
          value={mail}
          style={[
            styles.textInputStyles,
            {borderColor: theme.fontColor, color: theme.fontColor},
          ]}
          onChangeText={mailNew => setMail(mailNew)}
        />
        <Text style={[styles.textStyle, {color: theme.fontColor}]}>
          Password
        </Text>
        <TextInput
          value={password}
          secureTextEntry={true}
          style={[
            styles.textInputStyles,
            {borderColor: theme.fontColor, color: theme.fontColor},
          ]}
          onChangeText={passwordNew => setPassword(passwordNew)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonStyle, {borderColor: theme.fontColor}]}
        onPress={() => {
          const userNew = {
            username: username,
            password: password,
            mail: mail,
            id: id,
          };
          handleUser(userNew);
        }}>
        <Text style={[styles.buttonTextStyle, {color: theme.fontColor}]}>
          Save
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
  textInputStyles: {
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#0088cc',
    marginBottom: 50,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  textInputs: {
    marginTop: 75,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
    color: '#0088cc',
  },
  buttonStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
});
export default EditProfileScreen;
