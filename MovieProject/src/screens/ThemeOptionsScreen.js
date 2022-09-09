import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {ThemeContext} from '../context/theme';
import IconLight from 'react-native-vector-icons/Feather';
import IconDark from 'react-native-vector-icons/Feather';

const ThemeOptionsScreen = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.buttonStyle}>
        <View style={styles.firstImageAndTextStyle}>
          <TouchableOpacity
            style={styles.themeStyle}
            onPress={() => {
              toggleTheme('light');
            }}>
            <IconLight color={theme.fontColor} size={100} name="sun" />
          </TouchableOpacity>

          <Text style={[styles.textStyle, {color: theme.fontColor}]}>
            Light Theme
          </Text>
        </View>

        <View style={styles.imageAndTextStyle}>
          <TouchableOpacity
            style={styles.themeStyle}
            onPress={() => {
              toggleTheme('dark');
            }}>
            <IconDark color={theme.fontColor} size={100} name="moon" />
          </TouchableOpacity>

          <Text style={[styles.textStyle, {color: theme.fontColor}]}>
            Dark Theme
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  themeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageAndTextStyle: {
    marginStart: 50,
    alignItems: 'center',
  },
  firstImageAndTextStyle: {
    marginStart: 0,
    alignItems: 'center',
  },
});
export default ThemeOptionsScreen;
