import React from 'react';
import {PopularMoviesList} from "./PopularMoviesList";
import {MostRatedMoviesList} from "./MostRatedMoviesList";
import './MoviesLists.scss';

export const MoviesLists: React.FC<{ moviesData: any, handleMovieInfo: any }> = ({moviesData, handleMovieInfo}) => {
    return <>
        <div className='main-page-container__movie-lists'>
            <h3>Popular now</h3>
            {moviesData != null && <PopularMoviesList
                movies={moviesData}
                onMovieClick={handleMovieInfo}
            />}
            <h3>The most rated</h3>
            {moviesData != null && <MostRatedMoviesList
                movies={moviesData}
                onMovieClick={handleMovieInfo}
            />}
        </div>
    </>
}