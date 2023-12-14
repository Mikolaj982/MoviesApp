import React from "react";
import {Carousel} from "../../../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../../../assets/Carousel/CarouselItem";
import {MoviePoster} from "../../../../../assets/MoviePoster";
import {MovieDataProps} from "../../../../../App";

interface MostRatedMoviesProps {
    movies: any,
    onMovieClick: (movie: MovieDataProps) => void,
}

export const MostRatedMoviesList:React.FC<MostRatedMoviesProps> = ({movies, onMovieClick}): JSX.Element => {
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
                            <MoviePoster
                                movie={movie}
                                onClick={() => onMovieClick(movie)}
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