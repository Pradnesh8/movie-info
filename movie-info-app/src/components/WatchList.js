import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getMovies, deleteMovie,
    // getMultipleMovieRecommendations
} from "../actions/movieActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-loading-spinkit';
//import auth from '../../../middleware/auth';

class WatchList extends Component {

    static propTypes = {
        getMovies: PropTypes.func.isRequired,
        // getMultipleMovieRecommendations: PropTypes.func.isRequired,
        deleteMovie: PropTypes.func.isRequired,
        movie: PropTypes.object.isRequired,
        // RecommendedMoviesList: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        // recommendations_loading: PropTypes.bool,
        loading: PropTypes.bool
        //isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getMovies(localStorage.getItem('email'));
        // this.props.getMultipleMovieRecommendations(localStorage.getItem('email'));
    }

    getDetail = (id) => {
        localStorage.setItem('movie_id', id);
        window.location.replace("/details");
    }

    onDelete = id => {
        this.props.deleteMovie(id, localStorage.getItem('email'));
        // this.props.getMultipleMovieRecommendations(localStorage.getItem('email'));
        //console.log('Delete called! '+id);
    }

    render() {
        // const { movies, RecommendedMoviesList } = this.props.movie;
        const { movies } = this.props.movie;
        const { isAuthenticated } = this.props.auth;
        // const { recommendations_loading, loading } = this.props.movie;
        const { loading } = this.props.movie;
        const titles = [];
        movies.map((v, i) => {
            titles.push(v['title'])
        });
        /*
        if(recommendations_loading && !loading){
            this.props.getMultipleMovieRecommendations({movie_list: localStorage.getItem('movie_list')})
        }
        */
        //console.log(movies);
        return (

            <div className="container" id="movies">
                <div className="container" id="movieList">
                    <h2>Watchlist</h2>
                    {
                        !isAuthenticated ?
                            (
                                <Alert color="danger">Please Login to add movies in WatchList</Alert>
                            )
                            :
                            (
                                <div>
                                    {
                                        movies.length === 0 ?
                                            (
                                                <Alert color="primary">No Movies found! Please add movies in Watchlist</Alert>
                                            )
                                            :
                                            (
                                                <div className="row" id="movies">
                                                    {
                                                        movies.map((value, index) => {
                                                            return (
                                                                <div className="col-md-3" key={value['movie_id']}>
                                                                    <div className="well text-center">
                                                                        <span className="glyphicon-delete" onClick={this.onDelete.bind(this, value['movie_id'])}><FontAwesomeIcon icon={Icons.faMinusCircle} size="lg" pull="right" /></span>
                                                                        <img src={value['poster']} alt="Movie poster" />
                                                                        <h5 style={{ marginTop: "8px" }}>{value['title']}</h5>
                                                                        <Button color="dark" onClick={() => this.getDetail(value['movie_id'])}>Movie Details</Button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )

                                        /*
                                        this.state.watchlist.map((value, index) => {
                                            return (
                                                        <div className="col-md-3" key={value[0]}>
                                                            <div className="well text-center">
                                                                <img src={value[2]} alt="Movie poster"/>
                                                                <h5 style={{marginTop:"8px"}}>{value[1]}</h5>
                                                                <Button color="dark" onClick={() => this.getDetail(value[0])}>Movie Details</Button>
                                                            </div>
                                                        </div>
                                                    )
                                        })
                                        */
                                    }
                                </div>
                            )
                    }
                </div>
                {/* <h3>Top picks for you</h3> */}
                {/* <hr></hr> */}
                {/* <div className="row" id="recommended_movies">
                    {
                        (recommendations_loading === true) ?
                            (
                                <div style={{ height: '20vh', width: '100vw' }}>
                                    <Loading show={true} />
                                </div>
                                //<Loading show={true} color="#42c1a9"/>
                            )
                            :
                            (RecommendedMoviesList.length === 0) ?
                                (
                                    <Alert id="err" color="warning">Oops! No movies are recommended</Alert>
                                ) :
                                (
                                    RecommendedMoviesList.map(
                                        (item, key) =>
                                            (!titles.includes(item.Title)) ?
                                                (
                                                    <div class="col-md-3" key={item.imdbID}>
                                                        <div class="well text-center">
                                                            <img src={item.Poster} alt="Movie poster" />
                                                            <h5 style={{ marginTop: "8px" }}>{item.Title}</h5>
                                                            <Button color="dark" onClick={() => this.getDetail(item.imdbID)}>Movie Details</Button>
                                                        </div>
                                                    </div>
                                                ) : ""
                                    )
                                )

                    }
                </div> */}
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    movie: state.movie,
    auth: state.auth
    //isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    getMovies, deleteMovie,
    //  getMultipleMovieRecommendations 
})(WatchList);