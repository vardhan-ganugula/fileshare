import React, { useEffect, useRef, useState } from 'react'

function OtpForm({length, handleOtp}) {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const otpRefs = useRef([]);
    const handleOnchange = (elem, indx) => {
        // getting value, checking for integer and spaces 
        const value = elem.value.trim();
        if(!value || isNaN(value)) return;
        // updating the otp for the integer values only
        const newOtp = [...otp];
        newOtp[indx] = value.substring(value.length-1);
        setOtp(newOtp)
        // focusing to next element 
        if((indx < length-1) && value){
            elem.nextSibling.focus();
        }
        // updating the otp 
        const tempOtp = newOtp.join("");
        if(tempOtp.length == length){
            handleOtp(tempOtp)
        }
    }
    const handleOnKeyup = (event,elem, indx) => {
        if(event.key === 'Backspace'){
            const newOtp = [...otp]
            newOtp[indx] = "";
            setOtp(newOtp)
            if(indx>0){
                elem.previousSibling.focus();
            }

        }
    }

    useEffect(()=>{
        otpRefs.current[0].focus();
    }, [])

  return (
    <div className='flex gap-3'>
        {otp.map((val, indx) => (
            <input 
                type='text'
                value={otp[indx]}
                onChange={(e)=>handleOnchange(e.target, indx)}
                onKeyDown={(e)=>handleOnKeyup(e,e.target, indx)}
                key={indx}
                className='border-2 outline-none focus:border-blue-500 rounded border-blue-300 w-8 h-10 text-center'
                ref={(input)=> otpRefs.current[indx] = input}
            />
        ))}
    </div>
  )
}

export default OtpForm