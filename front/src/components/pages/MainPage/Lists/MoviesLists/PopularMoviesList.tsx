import React from "react";
import {MovieDataProps} from "../../../../../App";
import {Carousel} from "../../../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../../../assets/Carousel/CarouselItem";
import {MoviePoster} from "../../../../../assets/MoviePoster";

export const PopularMoviesList:
    React.FC<{
    movies: MovieDataProps[],
    onMovieClick: (movie: MovieDataProps) => void,
}> = ({
              movies,
              onMovieClick
}) => {
    const sortedByPopular = movies && movies.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

    return <>
        <Carousel>
            {sortedByPopular && sortedByPopular.map((movie, index) => {
                if (!movie.adult && movie.poster !== null) {
                return (
                    <CarouselItem key={index}>
                        <MoviePoster
                            movie={movie}
                            onClick={() => onMovieClick(movie)}
                            className='img'
                        />
                    </CarouselItem>
                );
                } else {
                    return null;
                }
             })}
            )
        </Carousel>
    </>
}