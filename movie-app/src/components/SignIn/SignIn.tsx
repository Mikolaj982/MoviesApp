import React, {useEffect, useState} from "react";
import './SignIn.scss'
import cinema from '../../assets/img/cinema1.jpg';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../hooks/useErrorHandler";
import {Error} from "../../assets/Error/Error"

export const SignIn: React.FC = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    })
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();
    const {error, handleError, resetError} = useErrorHandler()

    useEffect(() => {
        if (isLogged) {
            navigate('/main-page')
        }
    }, [navigate, isLogged]);

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // axios({
        //         method: "POST",
        //         data: {
        //             email: signInData.email,
        //             password: signInData.password,
        //         },
        //         withCredentials: true,
        //         url: "http://localhost:8000/login",
        //     })
        //         .then((res) => { console.log(res)})
        fetch('http://localhost:8000/login', {
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    email: signInData.email,
                    password: signInData.password,
                }
            )
        })
            .then((res) => {
                if (res.status === 200) {
                    setIsLogged(true)
                } else {
                    return res.json()
                        .then(data => {
                                handleError(data.msg)
                            }
                        )
                }
            })
            .catch((err) => console.log('There was an error', err));
    }

        const handleSignInData = (e: React.ChangeEvent<HTMLInputElement>): void => {
            setSignInData({
                ...signInData,
                [e.target.name]: e.target.value,
            })
        }

        return <>
            {error && <Error message={error} onClose={resetError}/>}
            <div className='container'>
                <div className='container__sign-in-container'>
                    <div className='container__sign-in-container__form-container'>
                        <h1>Sign In</h1>
                        <form className='container__sign-in-container__form-container__form' onSubmit={onSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type='email'
                                name='email'
                                value={signInData.email}
                                onChange={handleSignInData}
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={signInData.password}
                                onChange={handleSignInData}/>
                            <button type='submit'>Sign In</button>
                        </form>
                    </div>
                    <img src={cinema} alt=''/>
                </div>
            </div>
        </>
    }