import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../actions/posts';


const Comments = ({ post }: any) => {
    const [comments, setComments] = useState<any>(post?.comments);
    const [comment, setComment] = useState<string>('');
    const dispatch = useDispatch<any>();
    const commentsRef = useRef<HTMLDivElement | null>(null);
    const user = JSON.parse(localStorage.getItem('profile')!);

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
    }

    useEffect(() => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }, [comments])
    

  return (
    <div className=''>
        <div className=''>
            <div className='font-bold'>Comments</div>
            <div className='p-1 pl-3 bg-gray-900 w-[100%] md:w-[70%] h-[7rem] overflow-y-auto rounded-lg scrollbar-hide shadow-inner'>
                {comments.map((c: any, i: any) => (
                    <div className='flex flex-row' key={i}>
                        <strong className='mr-3'>{c.split(': ')[0]}</strong>
                        <div className='text-sm'>{c.split(':')[1]}</div>
                    </div>
                ))}
                <div ref={commentsRef}/>
            </div>
            {user?.result?.name && (
            <div className='w-[100%] md:w-[70%]'>
                <div className='text-lg font-bold mt-4 mb-2'>Leave a Comment</div>
                <textarea
                    placeholder='...'
                    className='bg-gray-800 w-full p-1 pl-2 rounded-md shadow-inner'
                    value={comment}
                    onChange={(e:any) => setComment(e.target.value)}
                />
                <button
                    className='px-2 rounded-md bg-green-800 py-2 opacity-70 hover:opacity-100 duration-500 shadow-lg select-none disabled:bg-gray-600 disabled:opacity-30'
                    onClick={handleClick}
                    disabled={!comment}
                >
                    Comment
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Comments;