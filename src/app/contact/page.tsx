'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import TextAreaComponent from '@/components/ui/TextAreaComponent';
import TextInput from '@/components/ui/TextInput';
import MapComponent from './MapComponent';
import './contact.scss';

const inputs = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    placeholder: 'eg: Harry Skywalker',
    errorMessage: 'Name should not be empty',
    label: 'Full Name',
    required: true,
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'eg: abc@gmail.com',
    errorMessage: 'It should be a valid email address!',
    label: 'Email',
    required: true,
  },
  {
    id: 3,
    name: 'subject',
    type: 'text',
    placeholder: 'Reg: Hola Namaste...',
    errorMessage: 'Subject should not be empty',
    label: 'Subject',
    required: true,
  },
  {
    id: 4,
    name: 'message',
    type: 'text',
    placeholder: 'Message',
    errorMessage: 'Message should not be empty',
    label: 'Message',
    required: true,
  },
];

const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_API_KEY;
const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export default function ContactPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.send(serviceID!, templateID!, values, emailjsPublicKey).then(
      () => {
        alert('Message sent succesfully!!!');
        window.location.reload();
      },
      () => {
        alert('Failed to send the message, please try again');
      }
    );
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <div className="container contact-page">
      <div className="contact-container">
        <div className="item contact-form">
          <div className="title">
            <h2>Contact Me</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {inputs.map((input) =>
              input.name === 'message' ? (
                <TextAreaComponent
                  key={input.id}
                  {...input}
                  value={values[input.name as keyof typeof values]}
                  onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                />
              ) : (
                <TextInput
                  key={input.id}
                  {...input}
                  value={values[input.name as keyof typeof values]}
                  onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                />
              )
            )}
            <div className="submit">
              <button className="flat-button">Submit</button>
            </div>
          </form>
        </div>
        <div className="item map">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}
