import React, {useEffect}from "react";
import './MainPage.scss'
import {Loading} from "../../../assets/Loading/Loading";
import {MovieDataProps} from "../../../App";
import {Navigation} from "./Navigation/Navigation";
import {MovieCategories} from "./MovieCategories/MovieCategories";
import {MoviesLists} from "./Lists/MoviesLists/MoviesLists";
import {Footer} from "./Footer/Footer";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {ErrorHandler} from "../../../assets/Error/ErrorHanlder";

export interface MainPageProps {
    moviesData: MovieDataProps[],
    isLoading: boolean,
    onSelectMovie: (movie: MovieDataProps) => void,
    setMyList: (myList: MovieDataProps[]) => void,
    myList: MovieDataProps[],
}

export const MainPage = ({
          moviesData,
          isLoading,
          onSelectMovie,
          setMyList,
          myList,
      }: MainPageProps) => {

    const handleMovieInfo = (movie: MovieDataProps): void => {
        onSelectMovie(movie);
    }
    const {error, handleError, resetError} = useErrorHandler();

    useEffect(() => {
        fetch(`api-eg4ce7ilv-mikolajs-projects.vercel.app/my-list`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const response = await res.json();
                    handleError(response.message)
                }
                const response = await res.json()
                const tempArray = [...myList];
                console.log(response)
                if (res.ok) {
                    moviesData && moviesData.forEach((movie) => {
                        if (!myList.includes(movie)) {
                            if (response.some((id: number) => id === movie.id)) {
                                tempArray.push(movie)
                            }
                        }
                    })
                    setMyList(tempArray)
                }
                console.log('pobrana lista danego użytkownika:', myList)
            })
    }, [handleError, moviesData, myList, setMyList]);

    return <>
        {error && <ErrorHandler message={error} onClose={resetError}/>}
        {isLoading ? <Loading/> :
            <div className='main-page-container'>
                <Navigation setMyList={setMyList} />
                <MovieCategories/>
                <MoviesLists moviesData={moviesData} handleMovieInfo={handleMovieInfo}/>
                <Footer/>
            </div>
        }
    </>
};