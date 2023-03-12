import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export const MyList:React.FC<{myList: any}> = ({myList}) => {
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/main-page')
    }
    return <>
        <div style={{backgroundColor:'cadetblue', height:'400px', zIndex:'3',}}>
            {myList && myList.map((movie: any, index: number) => {
                return <>
                    <img
                        key={index}
                        src={movie.poster}
                        alt={movie.name}
                        style={{
                            width: '150px',
                            height: '220px',
                        }}
                    />
                </>
            })}
            <button onClick={() => { backToPreviousPage()}}>back</button>
        </div>
    </>
}