import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(data) {
    setAuthError(null)
    const result = await login(data.email, data.password)

    if (!result.success) {
      setAuthError({ message: result.error, type: result.errorType })
      return
    }

    navigate('/')
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center bg-no-repeat relative'
      style={{
        backgroundImage:
          "url('https://image.hm.com/content/dam/global_campaigns/season_00/ladies/2020/launch/2020-CPD-8-hm-studio-holiday-capsule.jpg?imwidth=4800')",
      }}
    >
      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl'>

        <div className='hidden md:block w-1/2 relative'>
          <img
            src='https://image.hm.com/assets/hm/23/08/230855ffc54dd42792ca43dbd23976849a181abd.jpg?imwidth=2160'
            className='w-full h-full object-cover object-center'
            alt='Fashion model'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
          <div className='absolute bottom-10 left-8 right-8'>
            <h3 className='text-white font-michroma italic text-2xl leading-snug'>
              / Welcome Back
            </h3>
            <p className='text-white/70 text-sm mt-2 font-montserrat'>
              Sign in to your account.
            </p>
          </div>
        </div>

        <div
          className='w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-10 md:py-14'
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <NavLink
            to='/'
            className='font-cinzel text-2xl md:text-3xl font-bold tracking-widest text-white mb-8 block'
          >
            AZURE
          </NavLink>

          <h2 className='text-2xl md:text-3xl font-bold font-montserrat text-white mb-1'>
            Welcome Back
          </h2>
          <p className='text-white/60 text-sm mb-8 font-montserrat'>
            Sign in to your account
          </p>

          {authError && (
            <div
              className='mb-5 rounded-lg px-4 py-3 text-sm font-montserrat flex items-start gap-3'
              style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.45)',
              }}
            >
              <span className='text-red-400 mt-0.5'>⚠</span>
              <div>
                <p className='text-red-300 font-semibold'>
                  {authError.message}
                </p>
                {authError.type === 'NOT_FOUND' && (
                  <NavLink
                    to='/signup'
                    className='text-white underline underline-offset-4 font-bold text-xs mt-1 inline-block hover:text-white/80 transition-colors duration-200'
                  >
                    Create an account →
                  </NavLink>
                )}
              </div>
            </div>
          )}

          <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='email'
                className='text-sm font-semibold font-montserrat text-white/90 tracking-wide'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='Email address'
                className='rounded-lg px-4 py-3 text-sm font-montserrat outline-none transition-all duration-200 placeholder-white/40 text-white'
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: authError?.type === 'NOT_FOUND'
                    ? '1px solid rgba(239,68,68,0.6)'
                    : '1px solid rgba(255,255,255,0.3)',
                }}
                onFocus={e => {
                  e.target.style.background = 'rgba(255,255,255,0.22)'
                  e.target.style.border = '1px solid rgba(255,255,255,0.7)'
                }}
                onBlur={e => {
                  e.target.style.background = 'rgba(255,255,255,0.12)'
                  e.target.style.border = '1px solid rgba(255,255,255,0.3)'
                }}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-xs text-red-400 font-montserrat'>{errors.email.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='password'
                className='text-sm font-semibold font-montserrat text-white/90 tracking-wide'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='w-full rounded-lg px-4 py-3 pr-14 text-sm font-montserrat outline-none transition-all duration-200 placeholder-white/40 text-white'
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: authError?.type === 'WRONG_PASSWORD'
                      ? '1px solid rgba(239,68,68,0.6)'
                      : '1px solid rgba(255,255,255,0.3)',
                  }}
                  onFocus={e => {
                    e.target.style.background = 'rgba(255,255,255,0.22)'
                    e.target.style.border = '1px solid rgba(255,255,255,0.7)'
                  }}
                  onBlur={e => {
                    e.target.style.background = 'rgba(255,255,255,0.12)'
                    e.target.style.border = '1px solid rgba(255,255,255,0.3)'
                  }}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs font-montserrat font-semibold transition-colors duration-200 cursor-pointer'
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && (
                <p className='text-xs text-red-400 font-montserrat'>{errors.password.message}</p>
              )}
            </div>

            <button
              type='submit'
              className='mt-2 w-full bg-white text-[#261200] font-michroma font-bold py-3.5 rounded-lg tracking-widest hover:bg-white/90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg'
            >
              LOG IN
            </button>

          </form>

          <div className='flex items-center gap-3 my-6'>
            <div className='flex-1 h-px bg-white/20' />
            <span className='text-xs text-white/40 font-montserrat'>OR</span>
            <div className='flex-1 h-px bg-white/20' />
          </div>

          <p className='text-center text-sm font-montserrat text-white/60'>
            Don&apos;t have an account?{' '}
            <NavLink
              to='/signup'
              className='text-white font-bold hover:underline underline-offset-4 transition-all duration-200'
            >
              Sign Up
            </NavLink>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login