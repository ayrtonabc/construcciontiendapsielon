import { Tables, TablesInsert, TablesUpdate } from "./lib/database.types"

export type BlogData=Tables<"blogposts">
export type Order=Tables<"orders">
export type Product=Tables<"products">
export type Review=Tables<"reviews">
export type User_Profile =Tables<"user_profiles">







export type FormState = Prettify<
{
    blog:Tables<"blogposts">              //Omit<BlogData,"id" | 'date'> & { date?: string }; // Allow date to be optional initially
    product: Tables<"products">  ;
    isLoading: boolean;
    error: string | null;
  }>


  export type FormAction =
  | { type: 'SET_BLOG_FIELD'; field: Prettify<keyof FormState["blog"]>; value?: number|string }
  | { type: 'SET_PRODUCT_FIELD'; field: Prettify<keyof FormState["product"]>; value?: number|string } // Allow null for image_url
  | { type: 'RESET_BLOG_FORM', update?:TablesUpdate<"blogposts">   }
  | { type: 'RESET_PRODUCT_FORM', update?: TablesUpdate<"products">   } // Allow updating product form
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

  export interface ColorOption {
    name: string;
    hex: string;
    textColor: string; 
  }

  export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

  export type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type PrettifyDeep<T> = T extends object
  ? {
      [K in keyof T]: PrettifyDeep<T[K]>;
    } & {}
  : T;
