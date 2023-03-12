import React from "react";
import {useEffect, useState} from "react";
import {PopularMoviesList} from "./MoviesLists/PopularMoviesList";
import './MainPage.scss'
import {MostRatedMoviesList} from "./MoviesLists/MostRatedMoviesList";
import {Loading} from "../../assets/Loading/Loading";
import {Link} from "react-router-dom";
import {MovieDataProps, movieDataType} from "../../App";
import {AvatarOfUser} from "../../assets/Avatar/AvatarOfUser";

interface MainPageProps {
    onSelectMovie: (movie: MovieDataProps) => void
}

export const MainPage: React.FC<{
    moviesData: movieDataType,
    isLoading: boolean,
    onSelectMovie: any,
    avatar: any,
}> = React.memo(({
                     moviesData,
                     isLoading,
                     onSelectMovie,
                     avatar,
                 }) => {
    const handleMovieInfo = (movie: any): void => {
        onSelectMovie(movie);
    }

    return <>
        {isLoading ? <Loading/> :
            <div className='main-page-container'>
                <div className='main-page-container__nav-container'>
                    <div className='main-page-container__nav-container__nav'>
                        <div className='main-page-container__nav-container__nav__content'>
                            <div className='main-page-container__nav-container__nav__content__links'>
                                <a href='#'>home</a>
                                <a>movies</a>
                                <Link to='/search-input'>search</Link>
                                <Link to='/my-list'>my list</Link>
                                {/*<form action='/logout?_method=DELETE' method='POST'>*/}
                                {/*    <button type='submit'>log out</button>*/}
                                {/*</form>*/}
                                <a>log out</a>

                            </div>
                            <Link to='/select-avatar'><img src={avatar ? avatar : ''}
                                                           className='main-page-container__nav-container__nav__content__avatar'></img></Link>
                        </div>
                    </div>
                    {/*    */}

                    <div className='main-page-container__nav-container__popular-movie'>
                        <h1>Avatar</h1>
                        <div className='main-page-container__nav-container__buttons-container'>
                            <button>play now</button>
                            <button>watch list</button>
                        </div>
                    </div>

                </div>
                {/**/}
                <div className='main-page-container__movie-categories'>
                    <div><h2>Animation</h2></div>
                    <div><h2>Action</h2></div>
                    <div><h2>Sci-fi</h2></div>
                    <div><h2>Fantasy</h2></div>
                </div>
                <div className='main-page-container__movie-lists'>
                    <h3>My list</h3>
                    <h3>Popular now</h3>
                    {moviesData != null && <PopularMoviesList movies={moviesData}/>}
                    <h3>The most rated</h3>
                    {moviesData != null && <MostRatedMoviesList
                        movies={moviesData}
                        onMovieClick={handleMovieInfo}
                    />}
                </div>
                <div className='main-page-container__footer'>

                </div>
            </div>
        }
    </>
})