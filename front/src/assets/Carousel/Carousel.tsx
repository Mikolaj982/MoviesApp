import {useSnapCarousel} from "react-snap-carousel";
import {styles} from "./style";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CarouselProps {
    readonly children?: React.ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
        const { scrollRef, pages, activePageIndex, prev, next, goTo } =
            useSnapCarousel();
     return (
            <div>
                <ul ref={scrollRef}>
                    {children}
                </ul>
                <div style={styles.controls}>
                    <button
                        style={{
                            ...styles.nextPrevButton,
                            ...(activePageIndex === 0 ? styles.nextPrevButtonDisabled : {})
                        }}
                        onClick={() => prev()}
                    >
                        <ArrowBackIcon style={styles.img}/>
                    </button>
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            style={{
                                ...styles.paginationButton,
                                ...(activePageIndex === i ? styles.paginationButtonActive : {})
                            }}
                            onClick={() => goTo(i)}
                        >
                        </button>
                    ))}
                    <button
                        style={{
                            ...styles.nextPrevButton,
                            ...(activePageIndex === pages.length - 1
                                ? styles.nextPrevButtonDisabled
                                : {})
                        }}
                        onClick={() => next()}
                    >
                        <ArrowForwardIcon style={styles.img}/>
                    </button>
                </div>
            </div>
        );
    };

