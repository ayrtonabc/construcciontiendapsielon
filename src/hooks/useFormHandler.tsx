// useFormHandler.ts
import { useReducer } from 'react';
import { formReducer, initialState } from '../context/formReducer';
import { BlogData, FormState, Product } from '../types';


export function useFormHandler() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleBlogChange = (field: keyof FormState['blog'], value?: number|string) => {
    dispatch({ type: 'SET_BLOG_FIELD', field, value });
  };

  const handleProductChange = (field: keyof FormState['product'], value?: number|string) => {
    dispatch({ type: 'SET_PRODUCT_FIELD', field, value });
  };


  const resetBlogForm = (update?:BlogData) => {
    dispatch({ type: 'RESET_BLOG_FORM',update });
  };

  const resetProductForm = (update?:Product) => {
    dispatch({ type: 'RESET_PRODUCT_FORM',update });
  };

  const startSubmission = () => {
    dispatch({ type: 'SUBMIT_START' });
  };

  const submissionSuccess = () => {
    dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  const submissionError = (error: string) => {
    dispatch({ type: 'SUBMIT_ERROR', error });
  };

  return {
    formState: state,
    handleBlogChange,
    handleProductChange,
    resetBlogForm,
    resetProductForm,
    startSubmission,
    submissionSuccess,
    submissionError
  };
}
