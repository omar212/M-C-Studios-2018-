import React,  { Component } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config.js';
import './Home.css';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import Spinner from '../elements/Spinner/Spinner';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    id: ''
  }

componentDidMount() { //First
  this.setState({loading: true});
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  this.fetchItems(endpoint);
}

searchItems = (searchTerm) => {
  console.log("searched term is: ",searchTerm);
  let endpoint = '';
  this.setState({
    movies: [],   //we want the movies to clear and only show the movies that we searched for
    loading:true,
    searchTerm: searchTerm
  })

  if(searchTerm === ''){ //if there is no search term just call back the endpoint from componentDidMount
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  }else{
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
  }
  this.fetchItems(endpoint);
}
loadMoreItems = () => {
  let endpoint = '';
  this.setState({ loading: true });

  if(this.state.searchTerm === ''){  //basically if were not searching for anything that we load the page for the most popular movies
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
  } else {
    endpoint = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage}`;
  }
  this.fetchItems(endpoint); //will load the next page or load the searched item page
}

fetchItems = (endpoint) => {   //Second
  fetch(endpoint)
  .then(result => result.json())
  .then(result => {
    console.log(result); //pull out all the data based on the endpoint
    this.setState({
      movies: [...this.state.movies, ...result.results], // spread operator to make a copy of the old movie state and then append new movies using ...
      heroImage: this.state.heroImage || result.results[0], //if its null it will fill it with first movie with an API fetch else it will stay with the orginal
      loading: false,
      currentPage: result.page,
      totalPages: result.total_pages
    })
    // console.log(result.results[0].id);  //the id of the first movie;
  })
}
  render(){
    return(

      <div className = "rmdb-home">
      {this.state.heroImage ?
      <div>
        <HeroImage
          image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
          title = {this.state.heroImage.orginal_title}
          text = {this.state.heroImage.overview}
        />
        <SearchBar
          callback = {this.searchItems} />
      </div> : null }  {/* it will check if the heroimage exists if so it will render out the heroImage else it will render out null */}

        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={this.state.loading}
            >
            {this.state.movies.map( (element, i) => {
              return <MovieThumb
                        key={i}
                        onClick= {true}
                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` :  '/images/no_image.jpg'}
                        movieId={element.id}
                        movieName={element.orginal_title}
                      />
            })}
          </FourColGrid>
        </div>

        <Spinner />
        <LoadMoreBtn />
          Home
      </div>
    )
  }

}

export default Home;
