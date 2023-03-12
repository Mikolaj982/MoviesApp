import React, {MouseEventHandler} from 'react';
import './Error.scss'
import CloseIcon from '@mui/icons-material/Close';
export const Error: React.FC<{
    message: string,
    onClose: MouseEventHandler<HTMLButtonElement> | undefined
}> = ({
          message,
          onClose
      }) => {
    return <>
        <div className='error'>
            <button onClick={onClose}></button>
            <p>{message}</p>
        </div>
    </>
}