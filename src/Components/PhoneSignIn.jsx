import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./PhoneSignIn.css"
import {Button} from "@mui/material"


const PhoneSignIn = () => {


    return (
        <div className='phone-signIn'>
        <PhoneInput
            country={'us'}
        //   value={value}
        //   onChange={setValue}
        />
        <Button variant='contained'>Send OTP</Button>
        </div>
    )
}

export default PhoneSignIn