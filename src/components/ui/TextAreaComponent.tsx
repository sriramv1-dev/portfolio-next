'use client';

import { useState } from 'react';
import './text-area-component.scss';

type TextAreaProps = {
  label: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: number;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value?: string;
};

const TextAreaComponent = (props: TextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="textAreaInput">
      <label>{label}</label>
      <textarea
        {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        {...({ focused: focused.toString() } as React.HTMLAttributes<HTMLTextAreaElement>)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default TextAreaComponent;
