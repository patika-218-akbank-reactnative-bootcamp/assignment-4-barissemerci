/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useScrollToTop} from '@react-navigation/native';
import {ThemeContext} from '../context/theme';

import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const flatListRef = React.useRef();
  useScrollToTop(flatListRef);

  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('top_rated');
  const [activeButtons, setActiveButtons] = useState([0, 1, 1, 1]);
  const {theme} = useContext(ThemeContext);

  function navigateMovieDetailScreen(id) {
    navigation.navigate('MovieDetailScreen', {
      movieId: id,
    });
  }

  const renderMovieCard = ({item}) => (
    <MovieCard
      onPress={navigateMovieDetailScreen}
      title={item.title}
      rate={item.vote_average}
      poster_path={item.poster_path}
      description={item.overview}
      id={item.id}
    />
  );

  const renderLoader = () => {
    return (
      <View style={styles.indicatorStyle}>
        <ActivityIndicator size={'large'} color={'#aaa'} />
      </View>
    );
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const getMovies = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          activeFilter +
          '?api_key=97d61083fe94bbb0ca0fa483cc1b6041&language=en-US&page=' +
          currentPage,
      )
      .then(response => {
        setMovieList([...movieList, ...response.data.results]);
      });
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeFilter]);

  /* LOGOUT İÇİN
    const {user} = useSelector(state=>state.user)
    const dispatch= useDispatch()

    const clearStore = async () => {
        try {
          await AsyncStorage.setItem('user', '')

        } catch (e) {
          // saving error
        }
      }



    function handleLogout() {
        clearStore()
        dispatch(setUser(null))
        console.log("logoutuser",user)

    }
*/

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View>
        <ScrollView
          horizontal
          style={styles.scrollViewStyle}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            disabled={activeButtons[0] === 0 ? true : false}
            style={[
              styles.filterButtonStyle,
              {
                backgroundColor: activeButtons[0] === 0 ? 'gray' : 'yellow',
                borderColor: theme.fontColor,
              },
            ]}
            onPress={() => {
              setMovieList([]);
              setActiveButtons([0, 1, 1, 1]);
              setCurrentPage(1);
              setActiveFilter('top_rated');
            }}>
            <Text style={{color: activeButtons[0] === 0 ? 'white' : 'black'}}>
              Top Rated
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={activeButtons[1] === 0 ? true : false}
            style={[
              styles.filterButtonStyle,
              {
                backgroundColor: activeButtons[1] === 0 ? 'gray' : 'yellow',
                borderColor: theme.fontColor,
              },
            ]}
            onPress={() => {
              setMovieList([]);
              setActiveButtons([1, 0, 1, 1]);

              setCurrentPage(1);
              setActiveFilter('now_playing');
            }}>
            <Text style={{color: activeButtons[1] === 0 ? 'white' : 'black'}}>
              Now Playing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={activeButtons[2] === 0 ? true : false}
            style={[
              styles.filterButtonStyle,
              {
                backgroundColor: activeButtons[2] === 0 ? 'gray' : 'yellow',
                borderColor: theme.fontColor,
              },
            ]}
            onPress={() => {
              setMovieList([]);
              setActiveButtons([1, 1, 0, 1]);
              setCurrentPage(1);
              setActiveFilter('popular');
            }}>
            <Text style={{color: activeButtons[2] === 0 ? 'white' : 'black'}}>
              Popular
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={activeButtons[3] === 0 ? true : false}
            style={[
              styles.filterButtonStyle,
              {
                backgroundColor: activeButtons[3] === 0 ? 'gray' : 'yellow',
                borderColor: theme.fontColor,
              },
            ]}
            onPress={() => {
              setMovieList([]);
              setCurrentPage(1);
              setActiveButtons([1, 1, 1, 0]);

              setActiveFilter('upcoming');
            }}>
            <Text style={{color: activeButtons[3] === 0 ? 'white' : 'black'}}>
              Upcoming
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={movieList}
        ref={flatListRef}
        keyExtractor={item => item.id}
        renderItem={renderMovieCard}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'brown',
    padding: 5,
  },
  scrollViewStyle: {
    height: 60,
    marginTop: 5,
  },

  filterButtonStyle: {
    backgroundColor: 'yellow',
    height: 30,
    width: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
  },
  indicatorStyle: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default HomeScreen;
