import React, {useRef, useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import {useNavigate} from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
import './Video.scss';

const videoUrl = 'https://www.youtube-nocookie.com/embed/PvKiWRTSAzg&ab_channel=AhmedHassn';

export const VideoPlayer = () => {
    const playerRef = useRef(null)
    const navigate = useNavigate();
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    useEffect(() => {
        const hideButtonTimeout = setTimeout(() => {
            setIsButtonVisible(false);
        }, 5000);

        return () => {
            clearTimeout(hideButtonTimeout);
        };
    }, []);

    const invisibleStyles = {
        opacity: '0',
    }

    return <>
            <UndoIcon
                className='back-icon'
                onClick={() => navigate('/main-page')}
                sx={{
                    backgroundColor: '#181818',
                    color: 'gray',
                    zIndex: '40',
                    position: 'absolute',
                    top: '5%',
                    transform: 'translateX(-50%)',
                    left: '50%',
                    border: '3px solid grey',
                    borderRadius: '100px',
                    height: '50px',
                    width: '50px',
                    cursor: 'pointer',
                    padding: '10px',
                    boxSizing: 'content-box',
                    ...(isButtonVisible ? {} : invisibleStyles),
                    '&:hover': {
                        color: 'white',
                        opacity: '1',
                    },
                }}
            />

        <ReactPlayer url={videoUrl} ref={playerRef} controls={true}/>
    </>
}