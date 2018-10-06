import React from 'react';
import Welcome from './Welcome';
import MovieSearch from './MovieSearch';
import MovieResults from './MovieResults';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      movies: [],
      movieString: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange(movieString){
    this.setState({movieString});
  }

  submitSearch(movieString){
    return fetch(`http://www.omdbapi.com/?s=${movieString}&apikey=2cda7206`)
      .then(response => response.json())
      .then(result => this.setState({movies:result.Search||[]}));
  }

  render(){
    return (
      <div>
        <Welcome />
        <MovieSearch
          movieString={this.state.movieString}
          handleChange={this.handleChange}
          submitSearch={this.submitSearch}
        />
        <MovieResults movies={this.state.movies} />
      </div>
    )
  }
}

export default App;
