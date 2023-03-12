import React, {useEffect, useState} from "react";
import {MovieDataProps, movieDataType} from "../../../App";
import {Carousel} from "../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../assets/Carousel/CarouselItem";

export const MostRatedMoviesList: React.FC<{ movies: movieDataType, onMovieClick: any }> = ({movies, onMovieClick}) => {
    const sortedByRating = movies && movies.sort((a, b) => b.tmdb_vote_average - a.tmdb_vote_average);
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
                                src={movie.poster}
                                alt={movie.name}
                                style={{
                                    width: '150px',
                                    height: '220px',
                                }}
                            />
                        </CarouselItem>
                    );
                }
            })}

        </Carousel>
    </>
}