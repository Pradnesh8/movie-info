import React, { Component } from "react";
import axios from 'axios';
import { Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMovie, getDetails, deleteMovie, getRecommendations } from "../actions/movieActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-loading-spinkit';

class MovieDetail extends Component{
    
    state= {
        isAdded: false,
        movie_id: '',
        title: '',
        poster: '',
        visible: false,
        del: false
    }

    static propTypes = {
        getRecommendations: PropTypes.func.isRequired,
        addMovie: PropTypes.func.isRequired,
        getDetails: PropTypes.func.isRequired,
        deleteMovie: PropTypes.func.isRequired,
        movie: PropTypes.object.isRequired,
        RecommendedMoviesList: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        recommendations_loading: PropTypes.bool
    };

    onSubmit = (email) =>{
        //e.preventDefault();
        console.log(email);
        const newMovie = {
            email: email,
            movie_id: this.state.movie_id,
            title : this.state.title,
            poster : this.state.poster
        }
        //Add movie via addMovie action
        this.props.addMovie(newMovie);
        //console.log('Movie added to watchlist');
        this.setState({isAdded: !this.state.isAdded});
        this.setState({visible:true},()=>{
            window.setTimeout(()=>{
              this.setState({visible:false})
            },2000)
          });
    }

    getDetail= (id) =>{
        localStorage.setItem('movie_id', id);
        window.location.replace("/details");
    }

    getData= () =>{
        axios
            .get('https://www.omdbapi.com/?apikey=f91ce485&plot=full&i='+localStorage.getItem('movie_id'))
            .then(res =>{
                this.setState({movie_id:res.data.imdbID, title:res.data.Title, poster:res.data.Poster});
                //console.log(this.state.movieData);
                this.props.getRecommendations(res.data.Title);
            })
            .catch(err => {
                console.log(err);
            });
    }

    onDelete= () =>{
        this.props.deleteMovie(localStorage.getItem('movie_id'), localStorage.getItem('email'));
        this.setState({isAdded: !this.state.isAdded});
        //console.log('Delete called! '+localStorage.getItem('movie_id'));
        this.setState({del:true},()=>{
            window.setTimeout(()=>{
              this.setState({del:false})
            },2000)
          });
    }

    goBack= () =>{
        localStorage.removeItem('movie_id');
        window.location.replace("/");
    }

    getSite= () =>{
        window.open("https://www.imdb.com/title/"+localStorage.getItem('movie_id'));
    }

    componentDidMount(){
        this.getData();
        if(localStorage.getItem('email')!==null){
            this.props.getDetails(localStorage.getItem('movie_id'), localStorage.getItem('email'));
        }
        else{
            this.props.getDetails(localStorage.getItem('movie_id'), 0);
        }
    }

    render(){
        const { movieDetails } = this.props.movie;
        const { RecommendedMoviesList } = this.props.movie;
        const { recommendations_loading } = this.props.movie;
        const { isAuthenticated, user } = this.props.auth;
        //console.log(user);
        //this.setState({isAdded: movieDetails.isAdded});
        //console.log(movieDetails);//NEED MODIFICATION
        
        return(
            /*<div classNameName="container">
                <h3>Movie Details</h3>
            </div>*/
            <div className="container" id="movies">
            <div className="row">
                <Alert color="info" id="info" isOpen={this.state.visible} >
                    Movie added to the Watchlist!
                </Alert>
                <Alert color="danger" id="del" isOpen={this.state.del} >
                    Movie removed from the Watchlist!
                </Alert>
                <div className="col-md-4">
                    {
                        isAuthenticated ?
                        (
                            this.state.isAdded.toString()!==movieDetails.isAdded ? 
                            (
                                <span className="glyphicon-added" onClick={this.onDelete}><FontAwesomeIcon icon={Icons.faHeart} size="lg" pull="right" /></span>
                            ) 
                            :
                            (
                                <span className="glyphicon" onClick={this.onSubmit.bind(this, user.email)}><FontAwesomeIcon icon={Icons.faHeart} size="lg" pull="right" /></span>
                            )
                        ):
                        (
                            ''
                        )
                        
                    }
                    <img src={movieDetails.Poster} className="thumbnail"/>
                </div>
                <div className="col-md-8">
                    <h2>{movieDetails.Title}</h2>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Genre:</strong> {movieDetails.Genre}</li>
                        <li className="list-group-item"><strong>Released:</strong> {movieDetails.Released}</li>
                        <li className="list-group-item"><strong>Rated:</strong> {movieDetails.Rated}</li>
                        <li className="list-group-item"><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</li>
                        <li className="list-group-item"><strong>Director:</strong> {movieDetails.Director}</li>
                        <li className="list-group-item"><strong>Writer:</strong> {movieDetails.Writer}</li>
                        <li className="list-group-item"><strong>Actors:</strong> {movieDetails.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="well">
                <h3>Plot</h3>
                {movieDetails.Plot}
                <hr/>
                <div className="buttons">
                    <Button color="dark" onClick={this.getSite}>View IMDB</Button>
                    &nbsp;
                    <Button color="dark" onClick={this.goBack}>Go Back To Search</Button>
                </div>
                </div>
            </div>
            <h3>You may also like</h3>
            <hr></hr>
                <div className="row" id="recommended_movies">       
                    {
                    (recommendations_loading===true) ? 
                    (
                        <div style={{ height: '20vh', width: '100vw' }}>
                            <Loading show={true}/>
                        </div>
                        //<Loading show={true} color="#42c1a9"/>
                    )
                    :
                    (RecommendedMoviesList.length===0) ?
                        (
                            <Alert id="err" color="warning">Oops! No movies are recommended</Alert>
                        ):
                        (
                            RecommendedMoviesList.map(
                                (item, key) =>
                                    <div class="col-md-3" key={item.imdbID}>
                                        <div class="well text-center">
                                            <img src={item.Poster} alt="Movie poster"/>
                                            <h5 style={{marginTop:"8px"}}>{item.Title}</h5>
                                            <Button color="dark" onClick={() => this.getDetail(item.imdbID)}>Movie Details</Button>
                                        </div>
                                    </div>
                            )
                        )
                    
                    }               
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    movie: state.movie,
    auth: state.auth,
    RecommendedMoviesList: state.movie,
    recommendations_loading: state.movie
});

export default connect(mapStateToProps, { addMovie, getDetails, getRecommendations, deleteMovie } )(MovieDetail);