import React, {useEffect, useMemo} from "react";
import {useState} from "react";
import {MovieDataProps, movieDataType} from "../../../App";
// import {SearchInput} from './SearchInput.scss'
import SearchBox from 'react-search-box';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export const SearchInput: React.FC<{ movies: movieDataType, onMovieClick: any }> = ({movies, onMovieClick}) => {
    // const [searchMovie, setSearchMovie] = useState<any>();
    // const [data, setData] = useState<{ key: string, value: string }[]>([]);
    const navigate = useNavigate();
    // const handleSearchChange = (value: any) => {
    //     setSearchMovie(value);
    // }
    const data = movies && [...movies].map((obj, index) => {
        return {key: index.toString(), value: obj.name}
    });
    // const dataWithLinks = data?.map((obj, index) => {
    //     return <Link key={index} to={`/movies/${obj.value}`}><li>{obj.value}</li></Link>
    // });
    // console.log(dataWithLinks)
    //  const data = useMemo(async() => {
    //      const promiseResult = await movies.map((obj: object, index: number): { key: string, value: string }[] => {
    //          return { key: index.toString(), value: obj.name } as { key: string, value: string }[];
    //      });
    //  }, [movies]);
    //  useEffect(() => {
    //      async function loadData() {
    //          const result = await movies?.map((obj: any, index: number) => ({ key: index.toString(), value: obj.name }));
    //          setData(result || []);
    //      }
    //      loadData();
    //  }, [movies]);
    console.log(data)

    // const onSelect = (record: Record<any, any>) => {
    //     axios({
    //         method: "POST",
    //         withCredentials: true,
    //         headers: {
    //             'Content-type': 'application/json',
    //             Accept: 'application/json',
    //         },
    //         data: {
    //             name: record.item.value,
    //         },
    //         url: `http://localhost:4000/movies/name/:name`
    //     }).then((record) => console.log(record))
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    const findMovieData = (record: any, arr: any) => {
        const result = arr.find((obj: any) => obj.name === record.item.value) || null;
        console.log(result);
        onMovieClick(result);
    }

    return <>
        {data &&
            <SearchBox
                placeholder={'search'}
                data={data}
                onSelect={(record,) => {
                    console.log(record);
                    findMovieData(record, movies);
                    // onSelect(record)
                }}
                // value={searchMovie}
                onChange={value => console.log(value)}
            />
        }
    </>
}