import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import IconStar from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../context/theme';
const MovieDetailScreen = props => {
  const [movieDetail, setMovieDetail] = useState([]);
  const {theme} = useContext(ThemeContext);

  const getMovieDetail = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          props.route.params.movieId +
          '?api_key=97d61083fe94bbb0ca0fa483cc1b6041&language=en-US',
      )
      .then(response => {
        console.log(response.data);
        setMovieDetail(response.data);
      });
  };

  const renderGenres = ({item}) => {
    return (
      <View style={[styles.genreContainer, {borderColor: theme.fontColor}]}>
        <Text style={[styles.genreText, {color: theme.fontColor}]}>
          {item.name}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.titleStyle, {color: theme.fontColor}]}>
        {movieDetail.title}
      </Text>
      <View style={styles.dateAndPopularity}>
        <Text style={[styles.dateStyle, {color: theme.fontColor}]}>
          {movieDetail.release_date}
        </Text>
        <Text style={[styles.popularityStyle, {color: theme.fontColor}]}>
          Popularity: {movieDetail.popularity}
        </Text>
      </View>
      <View style={styles.flatListAndImageStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/' + movieDetail.poster_path,
            }}
          />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            horizontal
            data={movieDetail.genres}
            renderItem={renderGenres}
            keyExtractor={item => item.id}
            style={styles.flatListStyle}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.iconStarAndVote}>
            <IconStar
              name={'star-outlined'}
              size={40}
              color={theme.fontColor}
            />

            <Text style={[styles.voteAvarageStyle, {color: theme.fontColor}]}>
              {movieDetail.vote_average} / 10
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.description, {color: theme.fontColor}]}>
        {movieDetail.overview}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  titleStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  imageStyle: {
    height: 200,
    alignItems: 'flex-start',
  },
  imageViewStyle: {
    width: 150,
    marginTop: 20,
  },
  dateStyle: {
    fontSize: 18,
    color: 'black',
  },
  popularityStyle: {
    fontSize: 18,
    color: 'black',
  },
  dateAndPopularity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatListStyle: {
    marginTop: 50,
  },
  flatListAndImageStyle: {
    flexDirection: 'row',
  },
  genreText: {color: 'black', fontWeight: 'bold'},
  genreContainer: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  voteAvarageStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  iconStarAndVote: {
    flexDirection: 'row',

    justifyContent: 'flex-start',
  },
  flatListContainer: {
    marginLeft: 20,
    height: 175,
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  description: {fontSize: 18, color: 'black', marginTop: 10},
});

export default MovieDetailScreen;
