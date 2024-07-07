import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';

type Call = {};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  return (
    <>
      <div className='background'>
        <div className='shape'></div>
        <div className='shape'></div>
      </div>
      <form
        className='containerForm'
        onSubmit={handleSubmit((data) => {
          console.log(data);
          Swal.fire(
            `${'Good job!'}`,
            `${'You are being logged in!'}`,
            'success'
          ).then(() => {
            navigate('/home');
          });
        })}
      >
        <h3>Welcome back!</h3>

        <label htmlFor='username'>Email Adress</label>
        <input
          {...register('username', {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            },
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

        <button type='submit'>Log In</button>
        <div className='social'>
          <div className='go'>Google</div>
          <div className='fb'>Facebook</div>
        </div>
      </form>
    </>
  );
};

export default Login;
