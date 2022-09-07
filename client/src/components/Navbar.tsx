import { FaPaw } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const localUser = JSON.parse(localStorage.getItem('profile')!);
    const [user, setUser] = useState<any>(localUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
        setUser(null);
    }

    const login = () => {
        navigate('/auth');
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken: any = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(localUser!);
    }, [location])
    

  return (
    <div>
        <div className='flex flex-row shadow-lg w-[100%] h-14 items-center justify-between px-5 gap-5 mb-5 bg-gray-900'>
            <Link to='/' className='flex flex-row items-center gap-2 bg-transparent'>
                <div className='font-bold text-2xl'>DOGBLOG</div>
                <FaPaw size={30} fill='#DB4914'/>
            </Link>
            { user ? (
                <div className='flex flex-row h-10 items-center bg-gray-900'>
                    {user?.result.picture ? (
                        <img alt='avatar' src={`${user?.result.picture}`} className='h-8 w-8 bg-gray-900 rounded-full mr-2'/>
                    ):(
                        <div className='flex flex-row bg-blue-900 items-center justify-center h-8 w-8 rounded-full text-center font-bold text-lg border'>{user.result.name.charAt(0)}</div>
                    )}
                    <div className='bg-gray-900 mr-1 md:mr-20 ml-3'>{user?.result.name}</div>
                    <button className='px-3 p-1 rounded-lg bg-orange-800 opacity-60 hover:opacity-100 duration-500' onClick={logout}>Logout</button>
                </div>
            ) : (
                    <button 
                        className='px-3 p-1 rounded-lg bg-green-800 opacity-60 hover:opacity-100 duration-500'
                        onClick={login}>Login</button>
            )}
        </div>
    </div>
  )
}

export default Navbar;