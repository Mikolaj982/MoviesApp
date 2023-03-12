import React from "react";


interface CarouselItemProps {
    readonly children?: React.ReactNode;
}

export const CarouselItem = ({ children }: CarouselItemProps) => {
    return (
    <li>{children}</li>
    )
};
