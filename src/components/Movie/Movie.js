import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import Bar from '../elements/Bar/Bar';
import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
    wishList: [],
    addCart: []

  }

  componentDidMount(){
    this.setState({ loading: true })
    //First fetch the movie ... //match.params basically matchs the movie id variable in the app.js
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      console.log(result.id);
      //remember setState can also accept call back functions
      if(result.status_code){ //if this exist means there is no movie
        this.setState({ loading: false})
      }else{
        this.setState({ movie: result}, () => {
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => { //crew and job our predefined properties from the api and member is just a variable
            const directors = result.crew.filter( (member) => member.job === "Director");

            this.setState({
              actors: result.cast,
              directors,
              loading: false
            })
          })
        })
      }
    })
    .catch(error => console.error('Error', error))
  }
  // fetchButton = (id) => {
  //   this.state.wishList.push(this.result.id);
  //   console.log(this.state.wishList);
  // }

  render(){
    return(
      <div>
        <Bar />
        <h1>Movie</h1>
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
      {/* <button type = "Click" onClick={this.fetchButton()}/> */}
        {/* <FourColGrid /> */}
        <Spinner />
        {/* <Actor /> */}
      </div>
    );
  }
}

export default Movie;
