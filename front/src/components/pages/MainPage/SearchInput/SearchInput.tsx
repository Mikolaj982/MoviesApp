import React from "react";
import {MovieDataProps} from "../../../../App";
import './SearchInput.scss'
import SearchBox from 'react-search-box';
import {BackIcon} from '../../../../assets/BackIcon/BackIcon';

export const SearchInput: React.FC<{ movies: MovieDataProps[], onMovieClick: any }> = ({movies, onMovieClick}) => {

    const data = movies && [...movies].map((obj, index) => {
        return { key: index.toString(), value: obj.name }
    });

    const findMovieData = (record: any, arr: MovieDataProps[]) => {
        const result = arr.find((obj) => obj.name === record.item.value) || null;
        onMovieClick(result);
    }

    return <>
            <BackIcon className='search-input-back-icon'/>
        {data &&
            <SearchBox
                placeholder={'search'}
                data={data}
                onSelect={(record,) => {
                    findMovieData(record, movies);
                }}
                onChange={() => {return null}}
            />
        }
    </>
}