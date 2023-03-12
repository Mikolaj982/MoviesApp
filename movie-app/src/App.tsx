import './index.scss'
import {SignUp} from "./components/SignUp/SignUp";
import {SignIn} from "./components/SignIn/SignIn";
import {MainPage} from './components/MainPage/MainPage';
import {Route, Routes} from "react-router-dom";
import {MovieDetails} from "./components/MainPage/MovieDetails/MovieDetails";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SearchInput} from "./components/MainPage/SearchInput/SearchInput";
import {MyList} from "./components/MainPage/MyList/MyList";
import {AvatarOfUser} from "./assets/Avatar/AvatarOfUser";


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
    onSelectMovie: (movie: MovieDataProps) => void,
}

export type movieDataType = MovieDataProps[] | null;

export const App = () => {
    const [movieInfo, setMovieInfo] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [avatar, setAvatar] = useState<any>(null)
    const [moviesData, setMoviesData] = useState<movieDataType>(null);
    const [myList, setMyList] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://unelmamovie.com/api/v1/search/movie?limit=100`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer 423|QmfwGAIvrMNPYykGlypCm5BqnbQuMqqsacMXjrBG',
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setMoviesData(data.results);
            })
            .catch(error => console.log(error))

    }, []);

    const handleMovieInfo = (movie: MovieDataProps): void => {
        setMovieInfo(movie);
    }
    const setAvatarSrc = (avatar:any) => {
        setAvatar(avatar)
        navigate('main-page')
    }

    useEffect(() => {
        if (movieInfo) {
            navigate(`main-page/movie-details/${movieInfo.name}`)
        }
    }, [navigate, movieInfo])
    console.log(myList)
    return (
        <Routes>
            <Route path="/main-page"
                element={
                <MainPage
                    isLoading={isLoading}
                    moviesData={moviesData}
                    onSelectMovie={handleMovieInfo}
                    avatar={avatar}
                />
            }
            />
            <Route path="/" element={<SignUp/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="main-page/movie-details/:name"
                   element={
                       <MovieDetails
                           movie={movieInfo}
                           setInfo={setMovieInfo}
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
            <Route path='/my-list' element={<MyList myList={myList}/>}/>
            <Route path='/select-avatar' element={<AvatarOfUser setAvatarSrc={setAvatarSrc}/>}/>
        </Routes>
    );
}