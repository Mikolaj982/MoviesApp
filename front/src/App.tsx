import './index.scss'
import {SignUp} from "./components/pages/SignUp/SignUp";
import {SignIn} from "./components/pages/SignIn/SignIn";
import {MainPage} from './components/pages/MainPage/MainPage';
import {Route, Routes, useNavigate} from "react-router-dom";
import {MovieDetails} from "./components/pages/MainPage/MovieDetails/MovieDetails";
import React, {useEffect, useState} from "react";
import {SearchInput} from "./components/pages/MainPage/SearchInput/SearchInput";
import {MyList} from "./components/pages/MainPage/Lists/MyList/MyList";
import {VideoPlayer} from "./assets/Video/Video";
import {ListOfMovies} from "./components/pages/MainPage/MovieCategories/ListOfMovies/ListOfMovies";
import {useErrorHandler} from "./hooks/useErrorHandler";
import {ErrorHandler} from "./assets/Error/ErrorHanlder";

export interface MovieDataProps {
    id: number,
    name: string,
    type: string,
    description: string,
    poster: string,
    adult: boolean,
    backdrop: string,
    year: number,
    popularity: number,
    tmdb_vote_average: number,
}

export const App = () => {
    const [movieInfo, setMovieInfo] = useState<MovieDataProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);
    const [myList, setMyList] = useState<MovieDataProps[]>([]);
    const navigate = useNavigate();
    const {error, handleError, resetError} = useErrorHandler();

    useEffect(() => {
        setIsLoading(true);
            fetch(`https://unelmamovie.com/api/v1/search/movie?limit=100`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer 1056|JYIixR7l5vtlrWObMR4oYOAODOjaYkatYQGyu9lE',
                }
            })
                .then(res => res.json()
                )
                .then(data => {
                    setIsLoading(false);
                    setMoviesData(data.results);
                })
                .catch(() => {
                    setIsLoading(false);
                    handleError('Błąd pobierania danych');
                })
    }, [handleError]);

    const handleMovieInfo = (movie: MovieDataProps): void => {
        setMovieInfo(movie);
    }

    useEffect(() => {
        if (movieInfo) {
            navigate(`main-page/movie-details/${movieInfo.name}`)
        }
    }, [navigate, movieInfo]);

    return  <>{error && <ErrorHandler message={error} onClose={resetError}/>}
        <Routes>
            <Route path="/main-page"
                   element={
                       <MainPage isLoading={isLoading}
                                 moviesData={moviesData}
                                 onSelectMovie={handleMovieInfo}
                                 setMyList={setMyList}
                                 myList={myList}/>
                   }
            />
            <Route path="/"
                   element={<SignUp/>}
            />
            <Route path="/login"
                   element={<SignIn/>}
            />
            <Route path="main-page/movie-details/:name"
                   element={
                       <MovieDetails
                           setMovieInfo={setMovieInfo}
                           movie={movieInfo}
                           setMyList={setMyList}
                           myList={myList}
                       />
                   }
            />
            <Route path='/search-input'
                   element={
                       <SearchInput
                           movies={moviesData}
                           onMovieClick={handleMovieInfo}
                       />
                   }
            />
            <Route path='/my-list'
                   element={
                       <MyList
                           myList={myList}
                           onMovieClick={handleMovieInfo}
                       />
                   }
            />
            <Route path='/main-page/video'
                   element={<VideoPlayer/>}
            />
            <Route path='/list-of-movies'
                   element={
                       <ListOfMovies
                           moviesData={moviesData}
                           onMovieClick={handleMovieInfo}
                       />
                   }
            />
        </Routes>
    </>;
}