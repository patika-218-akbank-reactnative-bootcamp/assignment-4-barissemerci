import { View, Text ,StyleSheet, FlatList,TextInput,ActivityIndicator, Touchable, TouchableOpacity} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import SearchBar from '../components/SearchBar';
import axios from 'axios'
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../context/theme';

import MovieCard from '../components/MovieCard';
import { useScrollToTop } from '@react-navigation/native';

const SearchScreen = () => {
  const flatListRef = React.useRef()
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  const [currentPage,setCurrentPage]=useState(1)
  const [movieList,setMovieList]=useState([])
  const [query,setQuery]=useState('')
  const [lastPage,setLastPage]=useState(1)
 // const [upButton,setUpButton]=useState(false)
  useScrollToTop(flatListRef)

  const renderMovieCard = ({item}) => (
    <MovieCard onPress={navigateMovieDetailScreen} id={item.id} title={item.title} rate={item.vote_average} poster_path={item.poster_path} description={item.overview} />
  );
  const renderLoader=()=>{
    return(
      <View style={styles.indicatorStyle}>
        <ActivityIndicator size={'large'} color={'#aaa'} />
      </View> 
    )
  }

  useEffect(() => {
    
    getMovies()
      
    }, [currentPage,query])


  const loadMoreItem=()=>{
    setCurrentPage(currentPage+1);
    }

const getQuery=(query)=>{
  setCurrentPage(1)
  setMovieList([])
setQuery(query)
}

/*
const scrollToTop=()=>{

  flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  console.log(" flatListRef.current", flatListRef.current)
  setUpButton(false)
  
}*/

function navigateMovieDetailScreen(id) {
  navigation.navigate('MovieDetailScreen',{
    movieId:id
  });
}


    const getMovies =() =>{
    
      if(query!==''){
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=97d61083fe94bbb0ca0fa483cc1b6041&language=en-US&query='+query+'&page='+currentPage+'&include_adult=false').
        then(response=>{
         
            setLastPage(response.data.total_pages)
            setMovieList([...movieList,...response.data.results])
    
    
    })
      }
  
     
  
  
  
     }
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <SearchBar onPress={getQuery}/>

 {/*
   {flatListRef.current.offset!==0 &&
   <TouchableOpacity style={styles.upButtonStyle} onPress={scrollToTop}>
    <Text style={{color:'white'}}>Take me to the up</Text>
   </TouchableOpacity>}*/}
  
     

      {movieList.length===0? 
      
    (<View style={styles.couldntFindContainer}>
      <Text style={[styles.couldntFind,{color:theme.fontColor}]}>Couldn't Find Any Movie</Text>
    </View>):(


<FlatList 
showsVerticalScrollIndicator={false}
data={movieList}
ref={flatListRef}
keyExtractor={(item,index)=> ''+item.id+''+index}
renderItem={renderMovieCard}
ListFooterComponent={currentPage<= lastPage? renderLoader:(<Text style={styles.endOfListTextStyle}>End of the list</Text>)}
onEndReached={currentPage<= lastPage? loadMoreItem: null}
/>

    )




    }



        


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    padding:5
  },
  endOfListTextStyle:{
    alignSelf:'center',
    marginBottom:10,
    fontWeight:'bold',
    fontSize:16
  },
  upButtonStyle:{
    backgroundColor:'black',
    width:150,
    position:'absolute',
    top:80,
    alignSelf: 'center',
alignItems:'center',
justifyContent:'center',
    height:35,borderRadius:10,
zIndex:1
    
  
  },
  couldntFindContainer:{
alignItems:'center',
marginTop:50
  }
  ,couldntFind:{
    fontSize:25,
    fontWeight:'bold'

  }
  
 
});
export default SearchScreen