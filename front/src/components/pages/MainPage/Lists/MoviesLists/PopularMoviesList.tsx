import React from "react";
import {MovieDataProps} from "../../../../../App";
import {Carousel} from "../../../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../../../assets/Carousel/CarouselItem";

export const PopularMoviesList:
    React.FC<{
    movies: MovieDataProps[],
    onMovieClick: (movie: MovieDataProps) => void,
}> = ({
              movies,
              onMovieClick}) => {
    const sortedByPopular = movies && movies.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

    return <>
        <Carousel>
            {sortedByPopular && sortedByPopular.map((movie, index) => {
                if (!movie.adult && movie.poster !== null) {
                return (
                    <CarouselItem key={index}>
                        <img
                            onClick={() => {onMovieClick(movie);}}
                            key={index}
                            src={movie.poster}
                            alt={movie.name}
                            style={{
                                width: '150px',
                                height: '220px',
                            }}
                        />
                    </CarouselItem>
                );
                }})}
            )
        </Carousel>
    </>
}