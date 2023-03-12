import React from "react";
import {MovieDataProps} from "../../../App";
import {useNavigate} from "react-router-dom";

export const MovieDetails: React.FC<{
    movie: MovieDataProps,
    setInfo: any,
    setMyList: any,
    myList: any
}> = ({
          movie,
          setInfo,
          setMyList,
          myList
      }) => {
    const navigate = useNavigate();
    const backToPreviousPage = () => {
        setInfo(null)
        navigate('/main-page')
    }
    const handleFavMovie = (movie: object) => {
        if (myList.includes(movie)) {
            const newArray = myList.filter((item: any) => item !== movie);
            setMyList(newArray);
            console.log('usunięto film');
        } else {
            const newArray = myList.concat(movie);
            setMyList(newArray);
            console.log('dodano film');
        }
    }
    return <>
        <div style={{backgroundColor: 'cadetblue', height: '400px', zIndex: '3',}}>
            <p>{movie ? movie.name : 'nothing'}</p>
            <p>{movie ? movie.description : 'nothing'}</p>
            <button onClick={() => handleFavMovie(movie)}>add/delete to my list</button>
            <button onClick={() => {
                backToPreviousPage()
            }}>back
            </button>
        </div>
    </>
}