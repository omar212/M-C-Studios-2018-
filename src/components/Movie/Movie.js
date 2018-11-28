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
  // var movie_id = this.props.match.params.movieId;

  // this.handleAddCart = this.handleAddCart.bind(this);

  componentDidMount(){
    this.setState({ loading: true })
    //First fetch the movie ... //match.params basically matchs the movie id variable in the app.js
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }
 //  handleAddCart(e){
 //    addCart.push(movie_id);
 // }

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


      <div className="rmdb-movie">
        <Bar />
        {/*If there is a movie render out the navigation, movieinfo, and movieinfobar else return null*/}
        {this.state.movie ?
          <div>
            <MovieInfo movie={this.state.movie} directors={this.state.directors} />
            <MovieInfoBar movie={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
          </div>
          : null}

        {/*If there are actors for the movie */}
        {this.state.actors ?
          <div className="rmdb-movie-grid">
            <FourColGrid header={'Actors'}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />
              })}
            </FourColGrid>
          </div>
          : null}
          <button
            style= {{width: "50px", color: "blue"}}
            onClick= {this.handleAddCart}>
        </button>

      </div>
    );
  }
}

export default Movie;
