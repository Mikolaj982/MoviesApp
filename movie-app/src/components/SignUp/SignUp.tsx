import React from "react";
import {Form} from "./Form/Form";
import './SignUp.scss'
import cinema from '../../assets/img/cinema.jpg'

export const SignUp: React.FC = () => {
    return <>
        <div className='container'>
            <div className='container__sign-up-container'>
                <Form />
                <img src={cinema} alt='cinema'/>
            </div>
        </div>
    </>
}