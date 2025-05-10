// formReducer.ts
import { FormState, FormAction, Product, BlogData } from '../types';

export const initialState: FormState = {
  blog: {
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0], // Keep default date for blog
    status: 'Szkic',
    image: '',
    excerpt: '',
    content:'',
  },
  product: {
    name: '',
    price: 0,
    stock: 0,
    category: 'Akcesoria', // Default category
    description: '',
    image_url: undefined,
  },
  isLoading: false,
  error: null
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_BLOG_FIELD':
      return {
        ...state,
        blog: {
          ...state.blog,
          [action.field]: action.value
        }
      };

    case 'SET_PRODUCT_FIELD':
      return {
        ...state,
        product: {
          ...state.product,
          [action.field]: action.value
        }
      };

    case 'RESET_BLOG_FORM':{
      const blogUpdateData = action.update ? {
        ...initialState.blog,
        ...action.update,
        date: action.update.date ? new Date(action.update.date).toISOString().split('T')[0] : initialState.blog.date,
      } : initialState.blog;
      return {
        ...state,
        blog: blogUpdateData as Omit<BlogData, "id"> & { date?: string } // Ensure type compatibility
      };}

    case 'RESET_PRODUCT_FORM':{
       const productUpdateData = action.update ? { ...initialState.product, ...action.update } : initialState.product;
      return {
        ...state,
        product: productUpdateData as Omit<Product, "id"> // Ensure type compatibility
      };}

    case 'SUBMIT_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isLoading: false
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}
