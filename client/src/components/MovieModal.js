import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import { addMovie } from '../actions/movieActions';
import PropTypes from 'prop-types';

class MovieModal extends Component{
    state= {
        modal: false,
        name: '',
        description: '',
        genre: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle= () =>{
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange= e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e =>{
        e.preventDefault();

        const newMovie = {
            //name: this.state.name
            title: this.state.name,
            description : this.state.description,
            genre : this.state.genre
        }
        //Add movie via addMovie action
        this.props.addMovie(newMovie);

        //Close modal
        this.toggle();
    }

    render(){
        return(
            <div>
                { 
                this.props.isAuthenticated ? 
                (
                    <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                    >Add Movie
                    </Button>
                ) :  (
                    <h4 className="mb-3 ml-4">Please Login to manage Movies</h4>
                )
                }
                

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}> Add to Movie List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="movie">Movie Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="movie"
                                    placeholder="Add movie name"
                                    onChange={this.onChange}
                                />
                                <Label for="description">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    id="movie_description"
                                    placeholder="Add description of movie"
                                    onChange={this.onChange}
                                />
                                <Label for="genre">Genre</Label>
                                <Input 
                                    type="select" 
                                    name="genre" 
                                    id="genre" 
                                    onChange={this.onChange}
                                >
                                    <option>Drama</option>
                                    <option>Action</option>
                                    <option>Comedy</option>
                                    <option>Horror</option>
                                    <option>Romance</option>
                                    <option>Thriller</option>
                                </Input>
                                <Button 
                                    color="dark"
                                    style={{marginTop:"2rem"}}
                                    block
                                >Add Movie</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    movie: state.movie,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addMovie } )(MovieModal);