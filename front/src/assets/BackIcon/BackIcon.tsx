import React from 'react';
import {useNavigate} from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";

export const BackIcon = ({className}: {className: string}): JSX.Element => {
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/main-page')
    }

    return <>
        <UndoIcon
            className={className}
            onClick={() => {
            backToPreviousPage()
            }}
            style={{cursor:"pointer"}}
        />
    </>
}