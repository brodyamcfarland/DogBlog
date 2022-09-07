import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentId: string | null,
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>,
}

const Form = ({currentId, setCurrentId}:Props) => {
  const [postData, setPostData] = useState<any>({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state: any) => currentId ? state.posts.posts.find((p: any) => p._id === currentId) : null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile')!);

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])
  
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  }

  if(!user?.result?.name) {
    return (
      <div className='bg-gray-700 h-20 flex items-center justify-center rounded-tr-lg rounded-tl-lg'>
        <div className=''>
          Please Sign in to Continue
        </div>
      </div>
    )
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }

  return (
    <div className='shadow-lg'>
      <form className='flex flex-col justify-center items-center bg-gray-900 gap-3 p-5 rounded-tr-lg rounded-tl-lg' onSubmit={handleSubmit}>
        <header className='font-extrabold text-2xl bg-gray-900 pb-8'>{ currentId ? 'Editing' : 'Upload' } Doggo</header>
        <input className='bg-gray-800 w-[100%] p-1 pl-2 rounded-md' placeholder='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
        <input className='bg-gray-800 w-[100%] p-1 pl-2 rounded-md' placeholder='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
        <input className='bg-gray-800 w-[100%] p-1 pl-2 rounded-md' placeholder='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value})}/>
        <div className='mt-2 mb-6 select-none w-[100%] rounded-lg'>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}:any) => setPostData({ ...postData, selectedFile: base64})} />
        </div>
        <button className='w-[100%] rounded-md bg-green-800 py-2 opacity-70 hover:opacity-100 duration-500 shadow-lg select-none' type='submit' >Submit</button>
        <button className='w-[100%] rounded-md bg-slate-600 py-1 opacity-70 hover:opacity-100 duration-500 shadow-lg select-none' onClick={clear} >Clear</button>
      </form>
    </div>
  )
}

export default Form