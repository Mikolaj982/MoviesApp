import React from 'react';
import UndoIcon from "@mui/icons-material/Undo";
import {useNavigate} from "react-router-dom";
import '../../Lists/MyList/MyList.scss';
import {MoviePoster} from "../../../../../assets/MoviePoster";
import {MovieDataProps} from "../../../../../App";

export const ListOfMovies: React.FC<{
    moviesData: MovieDataProps[],
    onMovieClick: (movie: MovieDataProps) => void,
}> = ({
                                     moviesData,
                                     onMovieClick}) => {
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/main-page')
    }

    return <>
        <div className='my-list-container'>
            <div className='my-list-container__movies-list'>
                {moviesData && moviesData.map((movie: MovieDataProps) => {
                    return <>
                        <MoviePoster
                            movie={movie}
                            onClick={() => onMovieClick(movie)}
                            tag={'my-list-container__movies-list__image'}
                        />
                    </>
                })}
                <UndoIcon className='my-list-container__movies-list__prev-button' onClick={() => {
                    backToPreviousPage()
                }}/>
            </div>
        </div>
    </>
}