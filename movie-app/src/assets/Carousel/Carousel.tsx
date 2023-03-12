import {useSnapCarousel} from "react-snap-carousel";
import {styles} from "./style";
import React from "react";

interface CarouselProps {
    readonly children?: React.ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
        const { scrollRef, pages, activePageIndex, prev, next, goTo } =
            useSnapCarousel();
     return (
            <div style={styles.root}>
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
                        <img style={{transform:'rotate(180deg)', ...styles.img}} src='https://cdn-icons-png.flaticon.com/512/8805/8805223.png'/>
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
                        <img style={styles.img} src='https://cdn-icons-png.flaticon.com/512/8805/8805223.png' />
                    </button>
                </div>
                {/*<div style={styles.pageIndicator}>*/}
                {/*    {activePageIndex + 1} / {pages.length}*/}
                {/*</div>*/}
            </div>
        );
    };

