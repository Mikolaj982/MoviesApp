import React from "react";
import {MovieDataProps} from "../../../../App";
import './SearchInput.scss'
import SearchBox from 'react-search-box';
import {BackIcon} from '../../../../assets/BackIcon/BackIcon';

interface SearchInput {
    movies: MovieDataProps[],
    onMovieClick: () => void,
}

export const SearchInput: React.FC<{ movies: MovieDataProps[], onMovieClick: any }> = ({movies, onMovieClick}) => {

    const data = movies && [...movies].map((obj, index) => {
        return { key: index.toString(), value: obj.name }
    });

    const findMovieData = (record: any, arr: any) => {
        const result = arr.find((obj: any) => obj.name === record.item.value) || null;
        console.log(result);
        onMovieClick(result);
    }

    return <>
            <BackIcon className='search-input-back-icon'/>
        {data &&
            <SearchBox
                placeholder={'search'}
                data={data}
                onSelect={(record,) => {
                    console.log(record);
                    findMovieData(record, movies);
                }}
                onChange={value => console.log(value)}
            />
        }
    </>
}