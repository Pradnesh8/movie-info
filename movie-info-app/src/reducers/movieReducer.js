import {
    GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING, GET_DETAILS,
    // GET_RECOMMENDATIONS, RECOMMENDATIONS_LOADING
} from "../actions/types";

const initialState = {
    movies: [],
    movieDetails: [],
    // RecommendedMoviesList: [],
    loading: false,
    // recommendations_loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DETAILS:
            return {
                ...state,
                movieDetails: action.payload,
                loading: false
            };
        case GET_MOVIES:
            /*
            const titles=[];
            action.payload.map((v,i)=>{
                titles.push(v['title'])
            });
            localStorage.setItem('movie_list', titles);
            */
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        // case GET_RECOMMENDATIONS:
        //     return {
        //         ...state,
        //         RecommendedMoviesList: action.payload,
        //         recommendations_loading: false
        //     };
        case DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movies => movies.movie_id !== action.payload)
            };
        case ADD_MOVIE:
            return {
                ...state,
                movies: [action.payload, ...state.movies]
            };
        case MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };
        // case RECOMMENDATIONS_LOADING:
        //     return {
        //         ...state,
        //         recommendations_loading: true
        //     };
        default:
            return state;
    }
}