import React,  { Component } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_BACKGROUND_URL, BACKGROUND_IMAGE_ID } from '../../config.js';
import './Home.css';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import Spinner from '../elements/Spinner/Spinner';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Bar from '../elements/Bar/Bar';


class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    id: '',
    back_overview: '',
    back_title: ''
  }

componentDidMount() { //First
  this.setState({loading: true});
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const Background_endpoint = `${API_URL}movie/335983?api_key=${API_KEY}&language=en-US`;
  this.fetchItems(endpoint);
  // console.log(Background_endpoint);
  this.fetchBackgroundDetails(Background_endpoint);
  console.log(this.fetchBackgroundDetails(Background_endpoint));
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
    console.log("endpoint for if: ",endpoint);
  }else{
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;
    console.log("endpoint for else: ",endpoint);
  }
  this.fetchItems(endpoint);
}
loadMoreItems = () => {
  let endpoint = '';
  this.setState({ loading: true });

  if(this.state.searchTerm === ''){  //basically if were not searching for anything that we load the page for the most popular movies
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
    console.log("endpoint for load if: ", this.state.currentPage);
  } else {
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    console.log("endpoint for load else: ", this.state.currentPage);
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
      heroImage: this.state.heroImage || result.results[3], //if its null it will fill it with first movie with an API fetch else it will stay with the orginal
      loading: false,
      currentPage: result.page,
      totalPages: result.total_pages
    })
    console.log(result.page);  //the id of the first movie;
    // console.log(result.results.id[5]);
    // console.log(result.results.id[335983].orginal_title);
  })
  // console.log(IMAGE_BASE_BACKGROUND_URL)
}

  fetchBackgroundDetails = (Background_endpoint) => {
    fetch(Background_endpoint)
    .then(result => result.json())
    .then(result => {
        this.setState({
          back_title: result.original_title,
          back_overview: result.overview
        })
      })
    }

  // console.log(this.state.overview);

  render(){
    return(

      <div className = "rmdb-home">
      {this.state.heroImage ?
      <div>
        <Bar />
        <HeroImage
          image = {`${IMAGE_BASE_BACKGROUND_URL}`}
          title = {this.state.back_title}
          text = {this.state.back_overview}
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
                        clickable= {true}
                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` :  '/images/no_image.jpg'}
                        movieId={element.id}
                        movieName={element.original_title}
                      />
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null} {/*Checks to see if spinner is there */}
          {(this.state.currentPage < this.state.totalPages && !this.state.loading) ?
            <LoadMoreBtn text  ="Load More" onClick={this.loadMoreItems} />
            : null }

        {/*the above checks to see if we are not on the last page and the spinner is showing then you can show the load more button*/}
      </div>
      </div>
    )
  }

}

export default Home;
