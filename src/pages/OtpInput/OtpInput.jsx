import React, { useRef, useState } from 'react';
import './OtpInput.css';

const OtpInput = ({ digits = 6 }) => {
  const [otp, setOtp] = useState(new Array(digits).fill(''));
  const refs = useRef(new Array(digits).fill(null));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value)) && value.length <= 1) {
      console.log('inside', { value });
      setOtp((prev) => {
        prev[index] = value;
        return [...prev];
      });
      if (!value) {
        return;
      }
      const nextInput = refs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'Tab': {
        if (!otp[index].length) {
          e.preventDefault();
        }
        break;
      }
      case 'Backspace': {
        const prevInput = refs.current[index - 1];
        console.log({ prevInput });
        if (prevInput && otp[index].length < 1) prevInput.focus();
        break;
      }
      case 'ArrowLeft': {
        const prevInput = refs.current[index - 1];
        if (prevInput) prevInput.focus();
        break;
      }
      case 'ArrowRight': {
        const nextInput = refs.current[index + 1];
        if (nextInput && otp[index].length >= 1) nextInput.focus();
        break;
      }
    }
  };

  const callbackRef = (element, index) => {
    refs.current[index] = element;
  };

  console.log({ otp });

  return (
    <div className="boxes-container">
      {otp.map((value, index) => (
        <input
          key={index}
          autoFocus={index === 0}
          ref={(el) => callbackRef(el, index)}
          value={value ?? ''}
          className="otp-input"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
