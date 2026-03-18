'use client';

import { useState } from 'react';
import './text-input.scss';

type TextInputProps = {
  label: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value?: string;
};

const TextInput = (props: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="textInput">
      <label>{label}</label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        {...({ focused: focused.toString() } as React.HTMLAttributes<HTMLInputElement>)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default TextInput;
