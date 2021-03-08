import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getMovies, deleteMovie } from "../actions/movieActions";
import PropTypes from "prop-types";

class MovieList extends Component{

    static propTypes = {
        getMovies: PropTypes.func.isRequired,
        deleteMovie: PropTypes.func.isRequired,
        movie: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };    

    componentDidMount(){
        this.props.getMovies();
    }
    //Sends an action of Delete to movieActions
    onDeleteClick = id =>{
        this.props.deleteMovie(id);
    };

    render(){
        const { movies } = this.props.movie;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="movie-list">
                        { 
                            movies.map(({ _id, title })=>(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {
                                        this.props.isAuthenticated ?
                                        (
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;
                                        </Button>
                                        ) : null 
                                        }
                                        
                                        {title}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }

                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    movie: state.movie,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getMovies,deleteMovie } )(MovieList);