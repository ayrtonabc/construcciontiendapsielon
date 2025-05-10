import { Tables, TablesInsert, TablesUpdate } from './database.types';
import { Review } from '../types';
import {supabase} from "./supabase"

export type Models="blogposts"|"orders"|"products"|"reviews"|"user_profiles"
export const IMAGE_BUCKECT="product-images"



const createCRUD = <T extends Models>(tableName: T) => ({
  // CREATE
  create: async (data: TablesInsert<T>) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data as any)
      .select();
    if (error) throw error;
    return result[0] as Tables<T>;
  },

  // READ (all)
  getAll: async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    return data as Tables<T>[];
  },

  // READ (single)
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id as any)
      .single();
    if (error) throw error;
    return data as Tables<T>;
  },

  // UPDATE
  update: async (id: string, updates: TablesUpdate<T>) => {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates as any)
      .eq('id', id as any)
      .select();
    if (error) throw error;
    return data[0] as Tables<T>;
  },

  // DELETE
  delete: async (id: string) => {
    const { error } = await supabase.from(tableName).delete().eq('id', id as any);
    if (error) throw error;
    return true;
  },

  count: async ()=>{
    const { count, error } = await supabase
    .from(tableName)
    .select('*',{count:'exact',head:true});
    if (error) throw error;
    return count as number;
  }


});

export const get_reviews_blog=async (post_id:string)=>{
  const { data: reviews, error } = await supabase
  .from('reviews')
  .select('*')
  .eq('post_id', post_id)
  .order('date', { ascending: false }); // Ordenar por fecha (más recientes primero)
  if (error) throw error
  return reviews as Review[]


}

// Instancias específicas para cada tipo
export const blogCRUD = createCRUD('blogposts');
export const orderCRUD = createCRUD('orders');
export const productCRUD = createCRUD('products');
export const reviewCRUD = createCRUD('reviews');
