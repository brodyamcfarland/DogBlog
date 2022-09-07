import Home from './components/Home';
import Navbar from './components/Navbar';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile')!);
   
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Router>
        <div className="bg-gray-600 min-h-screen select-none">
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Navigate to="/posts"/> }/>
            <Route path='/posts' element={ <Home/> }/>
            <Route path='/posts/search' element={ <Home/> }/>
            <Route path='/posts/:id' element={ <PostDetails /> }/>
            <Route path='/auth' element={(!user ? <Auth/> : <Navigate to='/posts'/>)}/>
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
