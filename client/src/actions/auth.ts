import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData: any, navigate: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData: any, navigate: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}