import React from 'react';
import './EmptyList.scss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UndoIcon from '@mui/icons-material/Undo';
import {useNavigate} from "react-router-dom";

export const EmptyList = () => {

    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/main-page');
    }

    return <>
        <UndoIcon
            sx={{
                position: 'fixed',
                margin: '30px auto auto 30px',
                cursor: 'pointer',
                fontSize: '35px',
                color: 'gray',
                '&:hover': {
                    color: "white",
                },
            }}
            onClick={backToPreviousPage}
        />
        <div className='empty-list-container'>
            <AddCircleOutlineIcon sx={{
                fontSize: '100px',
                opacity: 0.7
            }}/>
            <p>My list is empty</p>
            <p>Items added to my list gonna showing here</p>
        </div>
    </>
}