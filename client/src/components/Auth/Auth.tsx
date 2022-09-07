import { BiLockAlt } from 'react-icons/bi';
import Input from './Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAppDispatch } from '../../hooks/hooks';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isSignup, setIsSignup] = useState<Boolean>(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = (e: any) => {
    e.preventDefault();
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res: any) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;
    console.log(result);
    try {
      dispatch({ type: 'AUTH', data: { result, token }});
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign in was unsuccessful. Try Again Later");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }

  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  
  return (
    <div className='w-[90%] md:w-[40%] lg:w-[30%] xl:w-[25%] m-auto shadow-lg'>
        <div className='bg-gray-900 py-3 rounded-lg'>
          <div className='bg-orange-800 shadow-lg justify-center w-[4rem] h-[4rem] m-auto rounded-full flex items-center pb-1 mb-3'>
            <BiLockAlt size={45} className='bg-transparent'/>
          </div>
          <div className='text-3xl font-bold text-center bg-transparent py-2 pb-8'>{isSignup ? 'Sign Up' : 'Login'}</div>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-3 pb-10'>
              { isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange}/>
                  <Input name='lastName' label='First Name' handleChange={handleChange}/>
                </>
              )}
              <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
              <div className='flex flex-row items-center'>
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                <div onClick={handleShowPassword} className='hover:cursor-pointer ml-2'>
                  {showPassword ? <MdOutlineVisibility size={20} className='bg-transparent'/> : <MdOutlineVisibilityOff size={20} className='bg-transparent'/>}
                </div>
              </div>
              { isSignup && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password'/> }
            </div>
            <button type='submit' className='px-5 p-1 mb-10 rounded-lg bg-green-800 opacity-60 hover:opacity-100 duration-500'>{ isSignup ? "Create Account" : "Login" }</button>
              <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleFailure}
              /> 
            <div className='mt-4'>
              <button onClick={switchMode} className='text-sm hover:bg-[#ffffff15] duration-500 px-3 py-2 rounded-lg'>
                { isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up" }
              </button>
            </div>
          </form>
          
        </div>
    </div>
  )
}

export default Auth