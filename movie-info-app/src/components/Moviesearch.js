import React, {Component} from 'react';
import{
    Form,
    Input,
    FormGroup,
    Button,
    Alert
} from 'reactstrap';
import axios from 'axios';
class Moviesearch extends Component{

    constructor(props){
        super(props);
        this.getDetail = this.getDetail.bind(this);
    }
    
    state= {
        name: '',
        movieList: null,
        isFound: true,
        showImg: true,
        sr: ''
    }

    onChange= e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    getDetail= (id) =>{
        localStorage.setItem('movie_id', id);
        window.location.replace("/details");
    }

    onSubmit = e =>{
        e.preventDefault();
        axios
            .get('https://www.omdbapi.com/?apikey=f91ce485&s='+this.state.name)
            .then(res =>{
                this.setState({movieList:res.data.Search, isFound: res.data.Response});
                //console.log(res.data.Response);
            })
            .catch(err => {
                console.log(err);
            });
        //Clear search bar
        this.setState({sr: this.state.name, name: '', showImg: false});
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div id="search-img" style={{display:(this.state.showImg ? 'block':'none')}}>
                        
                    </div>
                    <div className="searchBar"> 
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input type="text" name="name" id="name" onChange={this.onChange} value= {this.state.name} placeholder="Enter search text here.." />
                            </FormGroup>
                            <Button color="dark">Search</Button>
                        </Form>
                    </div>
                    <div id="search-results" style={{display:(this.state.sr==='' ? 'none':'block')}}>
                        <h3>Showing results for "{this.state.sr}"</h3>
                    </div>
                </div>
                <div className="container" id="movieList">
                    <div className="row" id="movies">       
                            {
                            (this.state.movieList===undefined || this.state.movieList===null) ? 
                            (
                                this.state.isFound==='False' ? 
                                (
                                    <Alert id="err">Movie Not Found!</Alert>
                                ):''
                            )
                            : 
                            this.state.movieList.map(
                                (item, key) =>
                                    <div class="col-md-3" key={item.imdbID}>
                                        <div class="well text-center">
                                            <img src={item.Poster} alt="Movie poster"/>
                                            <h5 style={{marginTop:"8px"}}>{item.Title}</h5>
                                            <Button color="dark" onClick={() => this.getDetail(item.imdbID)}>Movie Details</Button>
                                        </div>
                                    </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Moviesearch;