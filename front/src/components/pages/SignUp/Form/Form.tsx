import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../../../hooks/useErrorHandler";
import {ErrorHandler} from "../../../../assets/Error/ErrorHanlder";

export const Form: React.FC = () => {
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
    });
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
        fetch('https://api-theta-peach-12.vercel.app/signup', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    email: signUpData.email,
                    password: signUpData.password,
                }
            ),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    const msg = data.message;
                    handleError(msg);
                } else {
                    setIsRegistered(true);
                }
            })
            .catch(() => {
                handleError('Server problems. Try again later!')
            });
    }
    const handleSignUpData = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    }
    return <>
        {error && <ErrorHandler message={error} onClose={resetError}/>}
        <div className='container__sign-up-container__form-container'>
            <p>start for free</p>
            <h1>Create your account</h1>
            <div className='container__sign-up-container__form-container__link'>
                <p>Already a member?</p>
                <Link to={'/login'}>Log in</Link>
            </div>
            <form className='container__sign-up-container__form-container__form' onSubmit={onSubmit}>
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