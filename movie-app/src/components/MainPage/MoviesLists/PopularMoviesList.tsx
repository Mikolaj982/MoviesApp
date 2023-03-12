import React, { useEffect, useState} from "react";
import {movieDataType} from "../../../App";
import {Carousel} from "../../../assets/Carousel/Carousel";
import {CarouselItem} from "../../../assets/Carousel/CarouselItem";
// import {MovieInfo} from "./MovieDetails";

export const PopularMoviesList: React.FC<{movies: movieDataType}> = ({movies}) => {
    const sortedByPopular = movies && movies.sort((a, b) => b.popularity - a.popularity);
    console.log(sortedByPopular)
    return <>
        <Carousel>
            {sortedByPopular && sortedByPopular.map((movie,index) => {
                if (!movie.adult && movie.poster !== null) {
                return (
                    <CarouselItem key={index}>
                        <img
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