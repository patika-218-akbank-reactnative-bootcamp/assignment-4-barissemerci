import { Image,View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import {ThemeContext} from '../context/theme';

const MovieCard = ({id,onPress,title,rate,poster_path,description}) => {

  const {theme} = useContext(ThemeContext);


  




  return (
    <TouchableOpacity onPress={()=>{
      onPress(id)}}>
    <View style={[styles.container,{borderColor:theme.fontColor}]}>
        <View style={styles.imageAndText}>
        <Image style={styles.imageStyle} source={{uri: 'https://image.tmdb.org/t/p/w500/'+poster_path}} />
      <View style={styles.textsContainer}>
      <Text style={[styles.title,{color:theme.fontColor}]}>{title}</Text>
      <Text style={[styles.description,{color:theme.fontColor}]}> {description.length < 150
                ? `${description}`
                : `${description.substring(0, 150)}...`}</Text>
      <Text style={[styles.rate,{color:theme.fontColor}]}>{rate}/10</Text>

      </View>
     

        </View>
     
    </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      justifyContent:'center',
      padding:10,
      marginBottom:10,
      borderWidth:1
    },
    imageStyle:{
        width:120,
        height:175,
        marginRight:10
    },
    imageAndText:{
        flexDirection:'row',
        
    },
    title:{
        fontWeight:'bold',
        fontSize:22,
        marginLeft:5,
        color:'black',
        flexShrink: 1
        
    },
    description:{
        color:'black',
        fontSize:16,
        marginLeft:5,

    },
    rate:{
        color:'black',
        fontSize:20,
        marginLeft:5,
    },
    textsContainer:{
      width: 0,
      flexGrow: 1,
      flex: 1,
    }
   
  });
export default MovieCard