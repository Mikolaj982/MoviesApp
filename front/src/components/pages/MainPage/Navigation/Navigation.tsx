import React, {useState} from 'react';
import HomeIcon from "@mui/icons-material/Home";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SearchIcon from "@mui/icons-material/Search";
import {Link, useNavigate} from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import LogoutIcon from "@mui/icons-material/Logout";
import './Navigation.scss';

export const Navigation: React.FC<{ setMyList: any }> = ({setMyList}) => {
    const [added, setAdded] = useState(false)
    const navigate = useNavigate();
    return <>
        <div className='main-page-container__nav-container'>
            <div className='main-page-container__nav-container__nav'>
                <div className='main-page-container__nav-container__nav__content'>
                    <div className='main-page-container__nav-container__nav__content__links'>
                        <HomeIcon/><a href='#'>home</a>
                        <LocalMoviesIcon/><a>movies</a>
                        <SearchIcon/><Link to='/search-input'>search</Link>
                        <ViewListIcon/><Link to='/my-list'>my list</Link>
                        <LogoutIcon/><Link to='/login' onClick={() => {
                        localStorage.removeItem('token');
                        setMyList([]);
                    }}>log out</Link>
                    </div>
                </div>
            </div>
            <div className='main-page-container__nav-container__popular-movie'>
                <h1>Avatar</h1>
                <div className='main-page-container__nav-container__buttons-container'>
                    <button onClick={() => navigate('video')}>play now</button>
                    <button
                        onClick={
                            () => {
                                if (added === false) {
                                    setAdded(true);
                                } else setAdded(false)
                            }
                        }>
                        {added ? 'added' : 'add'}
                    </button>
                </div>
            </div>
        </div>
    </>
}