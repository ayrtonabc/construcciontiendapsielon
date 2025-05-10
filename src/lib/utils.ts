import { User_Profile } from "../types";
import { supabase } from "./supabase";
import { IMAGE_BUCKECT } from "./supabaseCrud";
export const formatDate=(date:string)=>(new Date(date)).toISOString().split('T')[0]



export async function uploadImage(file:File) {
  const { data, error } = await supabase.storage
    .from('product-images') // Nombre del bucket
    .upload(`products/${file.name}`, file); // Ruta dentro del bucket

  if (error) {
    throw new Error( "Error al subir la imagen");
  } else {
    console.log('File uploaded:', data);
    // Obtén la URL pública
    const {data:{publicUrl}} = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);
    return publicUrl
  }
}


export function orderUsers(users:User_Profile[]){
    const roles={
        superadmin:Array<User_Profile>(),
        admin:Array<User_Profile>(),
        user:Array<User_Profile>(),
        banned:Array<User_Profile>(),
    }
    users.map((user)=>{
        const inferRole=user.role as keyof typeof roles
        const column=roles[inferRole] 
        column.push(user)
    })
    const {superadmin,admin,user,banned}=roles

    return [...superadmin,...admin,...user,...banned]
}

export function getOptimizedImage(path: string,width:number,quality?:number) {
    try {
      const { data, error } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(path, {
          transform: { 
            width: width, 
            quality: quality||80, 
          }
        });
  
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error in image transformation:", (err as Error).message);
      // Fallback: Return original image
      const { data } =supabase.storage.from('product-images').getPublicUrl(path);
      return data;
    }
  }

  export const transformUrl=(path:string, width?:number,height?:number,quality?:number )=>{
    const {data}=supabase.storage.from(IMAGE_BUCKECT).getPublicUrl(path,{
      transform:{
        width:width,
        height:height,
        quality:quality||60
      }
    })
    const {publicUrl}=data
    return publicUrl
  }
