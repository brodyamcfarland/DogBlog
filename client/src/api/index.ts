import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req: any) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`;
    }
    return req;
});

export const fetchPost = (id: any) => API.get(`/posts/${id}`);
export const fetchPosts = (page: any) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery: any) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost: any) => API.post('/posts', newPost); 
export const updatePost = (id: any, updatedPost: any) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id:any) => API.delete(`/posts/${id}`);
export const likePost = (id:any) => API.patch(`/posts/${id}/likePost`);
export const comment = (value:any, id:any) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData: any) => API.post('/user/signin', formData);
export const signUp = (formData: any) => API.post('/user/signup', formData);