import React, {useEffect, useState} from "react";
import './SignIn.scss'
import cinema from '../../../assets/img/cinema.jpg';
import {useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {ErrorHandler} from "../../../assets/Error/ErrorHanlder"

export const SignIn: React.FC = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    })
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();
    const {error, handleError, resetError} = useErrorHandler();

    useEffect(() => {
        if (isLogged) {
            navigate('/main-page')
        }
    }, [navigate, isLogged]);

    const onSubmit = (e: React.SyntheticEvent ) => {
        e.preventDefault()
        fetch('/api-22l1barku-mikolajs-projects.vercel.app/login', {
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
            .then(async(res) => {
                const response = await res.json();
                if (!res.ok) {
                    handleError(response.message);
                } else {
                    localStorage.setItem('token', response.token);
                    setIsLogged(true)
                }
            })
            .catch((err) => handleError(err));
    }

        const handleSignInData = (e: React.ChangeEvent<HTMLInputElement>): void => {
            setSignInData({
                ...signInData,
                [e.target.name]: e.target.value,
            })
        }

        return <>
            {error && <ErrorHandler message={error} onClose={resetError}/>}
            <div className='container'>
                <div className='container__sign-in-container'>
                    <div className='container__sign-in-container__form-container'>
                        <p>Do not have account?<a href="/">Register here</a></p>
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