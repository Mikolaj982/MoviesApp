import React from 'react';
import {PopularMoviesList} from "./PopularMoviesList";
import {MostRatedMoviesList} from "./MostRatedMoviesList";
import './MoviesLists.scss';
import {MovieDataProps} from "../../../../../App";

export const MoviesLists: React.FC<{
    moviesData: MovieDataProps[],
    handleMovieInfo: (movie: MovieDataProps) => void
}> = ({
                                    moviesData,
                                    handleMovieInfo
}) => {
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