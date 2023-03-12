import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {Error} from "../../../assets/Error/Error";

export const Form: React.FC = () => {
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const {error, handleError, resetError} = useErrorHandler();
    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistered) {
            navigate('/login')
        }
    }, [navigate, isRegistered]);

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetch('http://localhost:8000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    firstName: signUpData.firstName,
                    lastName: signUpData.lastName,
                    email: signUpData.email,
                    password: signUpData.password,
                }
            )
        })
            .then((res) => {
                if (res.status === 200) {
                    setIsRegistered(true)
                } else {
                    return res.json()
                        .then(data => {
                                handleError(data.msg)
                            }
                        )
                }
            })
            .catch((err) => console.log('There was an error', err));


        // axios({
        //     method: "POST",
        //     data: {
        //         firstName: signUpData.firstName,
        //         lastName: signUpData.lastName,
        //         email: signUpData.email,
        //         password: signUpData.password,
        //     },
        //     withCredentials: true,
        //     url: "http://localhost:8000/register",
        // })
        //     .then((res) => { console.log(res)})
    }
    const handleSignUpData = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    }
    return <>
        {error && <Error message={error} onClose={resetError}/>}
        <div className='container__sign-up-container__form-container'>
            <p>start for free</p>
            <h1>Create your account</h1>
            <div className='container__sign-up-container__form-container__link'><p>Already a member?</p><a
                href='/login'>Log in</a></div>
            <form className='container__sign-up-container__form-container__form' onSubmit={onSubmit}>
                <div>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            name='firstName'
                            id='firstName'
                            type='text'
                            required
                            value={signUpData.firstName}
                            onChange={handleSignUpData}
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            name='lastName'
                            id='lastName'
                            type='text'
                            required
                            value={signUpData.lastName}
                            onChange={handleSignUpData}
                        />
                    </div>
                </div>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    type='email'
                    id='email'
                    required
                    value={signUpData.email}
                    onChange={handleSignUpData}
                />
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    id='password'
                    required
                    value={signUpData.password}
                    onChange={handleSignUpData}
                />
                <button type='submit'>Create account</button>
            </form>
        </div>
    </>
}