import { FormState } from "../../types"

type FieldKeys=keyof FormState['blog']|keyof FormState['product']
interface FieldForm{
  value:number|string|readonly string[]
  handleChange:(field:FieldKeys,value:string)=>void

}

export function FieldImage({handleChange,value}:FieldForm){
    return(<div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          URL de la Imagen (Opcional)
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={value}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange("image",e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>)
}


export  function FormExcerpt({handleChange,value}:FieldForm){
    return(<div>
      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
        Extracto (Opcional)
      </label>
      <textarea
        id="excerpt"
        name="excerpt"
        rows={3}
        value={value}
        onChange={(e)=>handleChange("excerpt",e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        placeholder="Breve descripción del post..."
      ></textarea>
    </div>)
}
