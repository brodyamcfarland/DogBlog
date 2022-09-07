import Post from '../components/Post';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>,
}

const Posts = ({setCurrentId}: Props) => {
  const { posts, isLoading } = useSelector((state: any) => state.posts);
  
  if(!posts.length && !isLoading) return <>'No Posts Available'</>;

  return (
    isLoading ? <div className='flex justify-center mt-20'>
                  <ThreeDots
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#DB4914" 
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div> : (
      <div className='flex flex-col lg:grid xl:grid lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {posts?.map((post: any) => (
            <Post post={post}
                  key={post._id}
                  setCurrentId={setCurrentId}
            />
        ))}
      </div>
    )
  )
}

export default Posts;