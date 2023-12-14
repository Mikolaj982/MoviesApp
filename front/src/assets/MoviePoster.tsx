import React, {MouseEventHandler, useEffect, useState} from "react";
import image from '../../src/assets/img/image-not-found.jpg';
import {MovieDataProps} from "../App";

interface MoviePosterProps {
    movie: MovieDataProps,
    onClick: MouseEventHandler<HTMLImageElement> | undefined,
    className: string,
}

export const MoviePoster = ({movie, onClick, className}: MoviePosterProps): JSX.Element => {
    const [imageSrc, setImageSrc] = useState(image);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageSrc(movie.poster);
        };
        img.onerror = () => {
            setImageSrc(image);
        };
        img.src = movie.poster;
    }, [movie.poster]);

    return <>
        <img
            onClick={onClick}
            src={imageSrc}
            className={className}
            alt="Movie Poster"
            style={{
                width: '160px',
                height: '220px',
            }}
        />
    </>;
};