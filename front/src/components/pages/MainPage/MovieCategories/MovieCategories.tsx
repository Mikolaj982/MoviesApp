import React from 'react';
import './MovieCategories.scss';
import {useNavigate} from "react-router-dom";

export const MovieCategories = () => {
    const navigate = useNavigate();

    return <>
        <div className='main-page-container__movie-categories'>
            <div aria-hidden="true" onClick={() => navigate('/list-of-movies')}>
                <h2>Animation</h2>
            </div>
            <div aria-hidden="true" onClick={() => navigate('/list-of-movies')}>
                <h2>Action</h2>
            </div>
            <div aria-hidden="true" onClick={() => navigate('/list-of-movies')}>
                <h2>Sci-fi</h2>
            </div>
            <div aria-hidden="true" onClick={() => navigate('/list-of-movies')}>
                <h2>Fantasy</h2>
            </div>
        </div>
    </>
}