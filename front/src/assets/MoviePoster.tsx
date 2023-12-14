import React, {MouseEventHandler, useEffect, useState} from "react";
import image from '../../src/assets/img/image-not-found.jpg';
import {MovieDataProps} from "../App";

interface MoviePosterProps {
    movie: MovieDataProps,
    onClick: MouseEventHandler<HTMLImageElement> | undefined,
    tag: string,
}

export const MoviePoster = ({movie, onClick, tag}: MoviePosterProps): JSX.Element => {
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
            className={tag}
            alt="Movie Poster"
            style={{
                width: '160px',
                height: '220px',
            }}
        />
    </>;
};