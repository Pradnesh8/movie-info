import axios from "axios";
import { GET_RECOMMENDATIONS, RECOMMENDATIONS_LOADING, GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING, GET_DETAILS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getMultipleMovieRecommendations = email => (dispatch, getState) =>{
    dispatch(setRecommendationsLoading());
    const titles=[];
    axios
        .get(`/api/movies/${email}`, tokenConfig(getState))
        .then(res=>
            res.data.map((v,i)=>{
                titles.push(v['title'])
            })
        )
        .then(()=>{
            axios
                .post(`/api/movies/get_recommendations`, {movie_list: titles})
                .then(res=>
                    dispatch({
                        type: GET_RECOMMENDATIONS,
                        payload: res.data
                    })
                )
                .catch(err=>
                    //console.log(err),
                    dispatch(returnErrors(err.response.data, err.response.status))    
                )
            }
        )
        .catch(err=>
            //console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))    
        );
};

export const getRecommendations = title => dispatch =>{
    dispatch(setRecommendationsLoading());
    axios
        .get(`/api/movies/get_recommendations/${title}`)
        .then(res=>
            dispatch({
                type: GET_RECOMMENDATIONS,
                payload: res.data
            })
        )
        .catch(err=>
            //console.log(err),
            dispatch(returnErrors(err.response.data, err.response.status))    
        );
};

export const getMovies = email => (dispatch, getState) =>{
    dispatch(setMoviesLoading());
    axios
        .get(`/api/movies/${email}`, tokenConfig(getState))
        .then(res=>
            dispatch({
                type: GET_MOVIES,
                payload: res.data
            })
        )
        .catch(err=>
            //console.log(err),
            dispatch(returnErrors(err.response.data, err.response.status))    
        );

};

export const addMovie = movie => (dispatch, getState) =>{
//export const addMovie = movie => dispatch =>{
    axios
        .post('/api/movies', movie, tokenConfig(getState))
        //.post('/api/movies', movie)
        .then(res=>
            dispatch({
                type: ADD_MOVIE,
                payload: res.data
            })
        )
        .catch(err=>
            //console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))    
        );
};

//export const getDetails = id => (dispatch, getState) =>{
export const getDetails = (id, email) => dispatch =>{
    dispatch(setMoviesLoading());
    axios
        //.get((`/api/movies/${id}`), tokenConfig(getState))
        .get(`/api/movies/details/${id}&${email}`)
        .then(res=>
            dispatch({
                type: GET_DETAILS,
                payload: res.data
            })
        )
        .catch(err=>
            //console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))    
        );
};

export const deleteMovie = (id, email) => (dispatch, getState) =>{
//export const deleteMovie = id => dispatch =>{
    axios
        .delete(`/api/movies/${id}&${email}`, tokenConfig(getState))
        //.delete(`/api/movies/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_MOVIE,
                payload: id
            })
        )
        .catch(err=>
            //console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))    
        );
};

export const setMoviesLoading = () =>{
    return{
        type: MOVIES_LOADING
    };
};

export const setRecommendationsLoading = () =>{
    return{
        type: RECOMMENDATIONS_LOADING
    };
};