import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../actions/posts';
import { AiOutlineHeart } from 'react-icons/ai';
import Comments from './Comments';



const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state:any) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const openPost = (_id: any) => {
    navigate(`/posts/${_id}`);
  }

  useEffect(() => {
    dispatch<any>(getPost(id));
    
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch<any>(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <ThreeDots height="80" width="80" radius="9" color="#DB4914" ariaLabel="three-dots-loading" visible={true}/>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }: any) => _id !== post._id);

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col-reverse md:flex-row justify-between bg-[#0000004f] w-[95%] m-auto p-10 rounded-lg shadow-lg'>
        <div className='flex flex-col w-[75%]'>
          <div className='font-bold text-4xl mb-4'>{post.title}</div>
          <div>
            <span className='text-sm shadow-lg rounded-xl px-2 p-1 bg-orange-700 hover:bg-orange-900 duration-500 select-none'>{post.tags.map((tag: any) => `#${tag} `)}</span>
          </div>
          <div className='my-10'>{post.message}</div>
          <div className='font-bold'>{post.name}</div>
          <div className='text-sm flex-1 mb-10'>{moment(post.createdAt).fromNow()}</div>
          <Comments post={post}/>
        </div>
        <div className='rounded-lg'>
          <img className='object-cover h-[25rem] w-[25rem] rounded-lg' src={post.selectedFile} alt={post.title} />

        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className='flex flex-col items-center justify-center my-3'>
          <div className='mb-2 text-sm'>Similar Posts:</div>
          <div className=''>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }: any) => (
              <div onClick={() => openPost(_id)} key={_id} className='bg-gray-800 w-[22rem] md:w-[30rem] h-[15rem] p-2 rounded-lg shadow-lg flex flex-row justify-between hover:cursor-pointer hover:opacity-80 duration-500 mb-10'>
                <div className='flex flex-col'>
                  <div className='font-bold'>{title}</div>
                  <div className='text-[10px]'>{name}</div>
                  <div className='text-sm mt-10 flex-1'>{message}</div>
                  <div className='flex flex-row items-center text-sm gap-1'><AiOutlineHeart size={20}/> {likes.length}</div>
                </div>
                <img className= 'h-[10rem] w-[10rem] md:h-[14rem] md:w-[14rem] rounded-lg' src={selectedFile} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails;