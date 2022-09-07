import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../actions/posts';
import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IndexInfo } from 'typescript';

interface Props {
  post: any;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>,
}

const Post = ({post, setCurrentId}:Props) => {
  const [likes, setLikes] = useState<any>(post?.likes);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile')!);
  const userId = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like: any) => like === userId);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like: any) => like === userId)
        ? (
          <><AiFillHeart size={20} />&nbsp;{likes.length}</>
        ) : (
          <><AiOutlineHeart size={20} color='red' />&nbsp;{likes.length}</>
        );
    }

    return <><AiOutlineHeart size={20} /></>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLike = async (e: any) => {
    e.stopPropagation();
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id: any) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const handleDelete = (e: any) => {
    e.stopPropagation();
    dispatch(deletePost(post._id))
  }

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setCurrentId(post._id)
  }

  return (
    <div className='h-[28rem] w-[20rem] md:h-[34rem] md:w-[20rem] rounded-lg shadow-lg bg-gray-900 m-auto my-3'>
      <div onClick={openPost} className='hover:cursor-pointer hover:opacity-50 duration-500 -z-50'>
        <div className='relative'>
          <img className='object-cover h-[16rem] md:h-[20rem] w-full rounded-tr-lg rounded-tl-lg' src={post.selectedFile} alt='postImage'/>
          <div className='absolute bottom-0 bg-transparent w-[100%]'>
            <div className='flex flex-col-reverse bg-[#0000004f] px-3 p-2'>
              <div className='font-bold bg-transparent'>{post?.name}</div>
              <div className='bg-transparent text-sm'>{moment(post.createdAt).fromNow()}</div>
            </div>
          </div>
          <div className='absolute top-1 right-1 bg-[#0000004f] hover:bg-[#0000007c] duration-500 rounded-full'>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <button
              className='p-2 bg-transparent'
              onClick={(e:any) => handleEdit(e)}
            >
              <BsThreeDots size={20} className='bg-transparent'/>
            </button>
            )}
          </div>
        </div>
        <div className='bg-gray-900'>
          <div className='p-1 mx-2 m-2'>{post.tags.map((tag: any, i: number)=> (
            <span key={i} className='inline w-full text-sm shadow-lg rounded-xl px-2 p-1 bg-orange-700 hover:bg-orange-900 duration-500 select-none'>
              #{tag}
            </span>)
          )}
          </div>
        </div>
        <div className='p-2'>
          <div className='text-left pl-2 font-bold'>{post.title}</div>
        <div className='p-2 h-[4rem] md:h-[6rem] rounded-lg font-thin text-sm'>{post.message}</div>
        </div>
        <div className='flex flex-row justify-between px-3 items-center'>
          <button 
            className='p-1 flex flex-row items-center gap-2shadow-lg opacity-50 hover:opacity-100 duration-300'
            onClick={(e: any) => handleLike(e)}
            disabled={!user?.result}
          >
            <Likes />
          </button>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <button className='p-[6px] flex flex-row text-sm items-center gap-2 rounded-full bg-red-600 shadow-lg opacity-50 hover:opacity-100 duration-300' onClick={(e: any) => handleDelete(e)}>
              <AiOutlineDelete size={20}/>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post