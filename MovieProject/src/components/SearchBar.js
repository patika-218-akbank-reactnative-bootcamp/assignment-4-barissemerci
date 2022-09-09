import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, Touchable, TouchableOpacity, View} from 'react-native';
import IconSearch from 'react-native-vector-icons/Fontisto'
import {ThemeContext} from '../context/theme';



const SearchBar = ({onPress}) => {
  const {theme} = useContext(ThemeContext);

const [query,setQuery]=useState('')
  return (
    <View style={[styles.container,{borderColor:theme.fontColor}]}>
      <TextInput
      onChangeText={text => {
        setQuery(text);
      }}
        placeholder="Search for movies"
        placeholderTextColor={theme.fontColor}
        style={[styles.textInputStyle,{borderColor:theme.fontColor,color:theme.fontColor}]}
      />
      <TouchableOpacity onPress={()=>{
        onPress(query)
      }}>
       <IconSearch  name={'search'}size={30} color={theme.fontColor}/>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height:40,
    width: '90%',
    alignSelf:'center',
  borderRadius: 25,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:10,
  justifyContent:'space-between',
  marginBottom:10
  },
  textInputStyle: {
    height: 40,
    borderRadius: 35 / 2,
    padding: 10,
    flex:1,
    marginRight:15,
    borderWidth:2
  },
  
});
export default SearchBar;