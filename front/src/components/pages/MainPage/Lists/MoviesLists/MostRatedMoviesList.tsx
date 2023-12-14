import React from "react";
import {Carousel} from "../../../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../../../assets/Carousel/CarouselItem";
import image from '../../src/assets/img/image-not-found.jpg';

interface MostRatedMoviesProps {
    movies: any,
    onMovieClick: any,
}

export const MostRatedMoviesList = ({movies, onMovieClick}: MostRatedMoviesProps): JSX.Element => {
    const sortedByRating = movies && movies.sort((a, b) => {
       if (a.tmdb_vote_average && b.tmdb_vote_average) {
           return (b.tmdb_vote_average - a.tmdb_vote_average).toString();
       }
       return 0;
    });

    const topMovies = sortedByRating && sortedByRating.slice(0, 10);

    return <>
        <Carousel>
            {topMovies && topMovies.map((movie, index) => {
                if (!movie.adult && movie.poster !== null) {
                    return (
                        <CarouselItem key={index}>
                            <img
                                onClick={() => onMovieClick(movie)}
                                key={index}
                                src={movie.poster ? movie.poster : image}
                                alt={movie.name}
                                style={{
                                    width: '150px',
                                    height: '220px',
                                }}
                            />
                        </CarouselItem>
                    );
                } else {
                    return null;
                }
            })}
        </Carousel>
    </>
}