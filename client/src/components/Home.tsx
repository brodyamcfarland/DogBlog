import Posts from '../components/Posts';
import Form from '../components/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../actions/posts';
import ReactPaginate from "react-paginate";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import Chip from 'material-ui-chip-input';
import '../components/MuiChipStyles.css';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const [currentId, setCurrentId] = useState<null | string>(null);
    const [search, setSearch] = useState<string>('');
    const [tags, setTags] = useState<Array<string>>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const { numberOfPages } = useSelector((state: any) => state.posts);
    const pageCount = 5;
  
    useEffect(() => {
      if(page) dispatch<any>(getPosts(page));
    }, [page]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
        searchPost();
      }
    }

    const changePage = (e: any) => {
      navigate(`/posts?page=${e.selected + 1}`)
    };

    const handleAddTag = (tag: string) => {
      setTags([...tags, tag]);
    };

    const handleDeleteTag = (tagToDelete: string) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch<any>(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        navigate('/');
      }
    }

  return (
    <div>
        <div>
          <div className='flex flex-col-reverse md:flex-row justify-between px-2 lg:mx-auto gap-3 md:gap-4'>
            <div className='rounded-lg bg-[#00000050] px-3 mb-2 w-full'>
              <Posts  setCurrentId={setCurrentId}/>
            </div>
            <div className='w-full md:w-[18rem] lg: xl:w-[20rem]'>
              <div className='flex flex-col w-full rounded-lg pt-3 px-3 mb-3 bg-gray-900'>
                <input className='text-white pl-2 rounded-lg bg-gray-800' name='search' placeholder='Search Posts' value={search} onChange={(e: any) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
                <Chip
                  style={{ margin: '10px 0', backgroundColor: '#FFFFFF18', color: 'black', borderRadius: '.5rem' }}
                  value={tags}
                  color='secondary'
                  onAdd={handleAddTag}
                  onDelete={handleDeleteTag}
                  label='Search Tags'
                  variant='filled'
                />
                <button onClick={searchPost} className='w-full p-1 mb-3 rounded-lg shadow-lg bg-orange-800 opacity-50 hover:opacity-100 duration-500'>Search</button>
              </div>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <ReactPaginate
                previousLabel={ <div className='rounded-full p-1 bg-orange-800 opacity-60 hover:opacity-100 duration-500'><AiOutlineLeft size={18}/></div> }
                nextLabel={ <div className='rounded-full p-1 bg-orange-800 opacity-60 hover:opacity-100 duration-500'><AiOutlineRight size={18}/></div> }
                pageCount={parseInt(numberOfPages)}
                onPageChange={changePage}
                initialPage={Number(page) - 1 || 0}
                containerClassName={"flex flex-row gap-4 items-center justify-center py-3 px-6 rounded-br-lg rounded-bl-lg bg-gray-900 select-none shadow-lg"}
                disabledClassName={"opacity-10"}
                pageClassName={'flex p-3 flex-row items-center justify-center h-5 w-5 text-sm opacity-60 hover:opacity-100 duration-500'}
                activeClassName={"font-bold h-5 w-5 bg-[#FFFFFF25] rounded-full shadow-lg"}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home