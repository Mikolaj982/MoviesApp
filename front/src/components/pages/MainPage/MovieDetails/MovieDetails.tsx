import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {MovieDataProps} from "../../../../App";
import {useNavigate} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './MovieDetails.scss';

interface MovieDetailsProps {
    myList: MovieDataProps[],
    setMyList: Dispatch<SetStateAction<MovieDataProps[]>>,
    movie: any,
    setMovieInfo: any,
}

export const MovieDetails = ({
                                setMovieInfo,
                                movie,
                                setMyList,
                                 myList,
                             }: MovieDetailsProps): JSX.Element => {

    const [added, setAdded] = useState(false);
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        setMovieInfo(null)
        navigate('/main-page')
    }

    useEffect(() => {
        if (movie) {
            if (myList.some((m: any) => m.id === movie.id)) {
                setAdded(true);
            }
        }
    }, [movie, myList])

    const handleFavMovie = (movie: MovieDataProps | null) => {
        if (!myList.includes(movie as MovieDataProps)) {
            fetch(`https://api-ytdrr2dj8-mikolajs-projects.vercel.app/my-list`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({myMovieId: movie && movie.id}),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log('error in fetch')
                    } else {
                        console.log('movie added');
                        movie && setMyList([...myList, movie])
                    }
                })
        }
        if (myList.includes(movie as MovieDataProps)) {
            fetch(`https://api-ytdrr2dj8-mikolajs-projects.vercel.app/my-list`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({myMovieId: movie && movie.id}),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log('error in fetch')
                    } else {
                        console.log('movie deleted');
                        setMyList([...myList].filter(item => item !== movie));
                    }
                })
        }
    }

    return <>
        <div className='movie-details-container' style={{
            backgroundImage: `url(${movie ? movie.backdrop : ''})`
        }}>
            <div className='movie-details-container__poster'>
                {movie ? <img src={movie.poster}></img> : ''}
            </div>
            <div className='movie-details-container__info-container'>
                <div className='movie-details-container__info-container__name'>
                    {movie ? movie.name : ''}
                </div>
                <div
                    className='movie-details-container__info-container__description'>
                    {movie ? movie.description : ''}
                </div>
                <div className='movie-details-container__info-container__buttons'>
                    {added ?
                        <DownloadDoneIcon
                            sx={{fontSize: '3rem'}}
                            onClick={() => {
                                handleFavMovie(movie);
                                setAdded(false);
                            }}/>
                        : <AddCircleOutlineIcon
                            sx={{fontSize: '3rem'}}
                            onClick={() => {
                                handleFavMovie(movie);
                                setAdded(true)
                            }}/>}
                    <SkipPreviousIcon
                        sx={{fontSize: '3rem'}}
                        onClick={() => {
                            backToPreviousPage()
                        }}>back
                    </SkipPreviousIcon>
                </div>
            </div>
        </div>
    </>
}