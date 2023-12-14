import React from 'react';
import {useNavigate} from "react-router-dom";
import {EmptyList} from "../EmptyList/EmptyList";
import UndoIcon from '@mui/icons-material/Undo';
import './MyList.scss';
import {MovieDataProps} from '../../../../../App';
import {MoviePoster} from "../../../../../assets/MoviePoster";

export const MyList: React.FC<{
    myList: MovieDataProps[],
    onMovieClick: (movie: MovieDataProps) => void,
}> = ({
                               myList,
                               onMovieClick
}) => {
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/main-page')
    }
    return <>
        <div className='my-list-container'>
        {myList.length === 0 ? <EmptyList/> :
            <div className='my-list-container__movies-list'>
                {myList && myList.map((movie: MovieDataProps, index: number) => {
                    return <>
                        <MoviePoster
                            movie={movie}
                            onClick={() => onMovieClick(movie)}
                        />
                    </>
                })}
                <UndoIcon className='my-list-container__movies-list__prev-button'
                          onClick={() => {backToPreviousPage()}}
                />
            </div>
        }
        </div>
    </>
}