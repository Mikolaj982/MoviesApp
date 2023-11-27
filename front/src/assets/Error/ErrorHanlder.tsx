import React, {MouseEventHandler, ReactNode} from 'react';
import './Error.scss'
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

export const ErrorHandler = ({message, onClose}:
    {
        message: string | ProgressEvent<FileReader> | ReactNode,
        onClose: MouseEventHandler<HTMLButtonElement> | undefined
    }): JSX.Element => {
    return <>
        <div className='error'>
            <WarningIcon className='error__warning-icon' sx={{height: '50px', width: '50px'}}/>
            <p>{typeof message === 'string' ? message : ''}</p>
            <button onClick={onClose}>
                <CloseIcon sx={{padding: '0'}}/>
            </button>
        </div>
    </>
}