import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './style.css';
import { CloseCircleOutlined } from '@ant-design/icons';

interface authCredentials {
  username: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: authCredentials) => {
    try {
      const userData = {
        "username": data.username,
        "password":  data.password,
        "imageURL": "noData",
        "bio": "noData",
        "rank": "noData",
        "firstName": "noData"
    }
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      Swal.fire('Good job!', 'Your account is registered!', 'success').then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire('Oops...', 'Invalid credentials', 'error');
    }
  };

  return (
    <>
      <div className='background'>
        <div className='shape'></div>
        <div className='shape'></div>
      </div>
      <form className='containerForm' onSubmit={handleSubmit(onSubmit)}>
        <h3>Welcome back!</h3>

        <label htmlFor='username'>Email Address</label>
        <input
          {...register('username', {
            required: true,
            // pattern: {
            //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //   message: 'Please enter a valid email',
            // },
          })}
          type='text'
          placeholder='Email or Phone'
          id='username'
          className='theInput'
        />
        {errors.username && (
          <p style={{ color: 'red' }}>
            <CloseCircleOutlined />
            {'    Email should be of valid format!'}
          </p>
        )}

        <label htmlFor='password'>Password</label>
        <input
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
          type='password'
          placeholder='Password'
          id='password'
          className='theInput'
        />

        {errors.password && (
          <p style={{ color: 'red' }}>
            <CloseCircleOutlined style={{ fill: 'red' }} />
            {'    Password must have at least 8 characters!'}
          </p>
        )}

        <button type='submit'>Register</button>
        <div className='social'>
          <div className='go'>Google</div>
          <div className='fb'>Facebook</div>
        </div>
      </form>
    </>
  );
};

export default Register;
