import React from "react";
import {MovieDataProps} from "../../../../../App";
import {Carousel} from "../../../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../../../assets/Carousel/CarouselItem";
import image from '../../../../../../src/assets/img/image-not-found.jpg';

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
            )
        </Carousel>
    </>
}