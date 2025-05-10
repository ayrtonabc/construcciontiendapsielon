import { ImageIcon, Tag } from "lucide-react"
import { Link } from "react-router-dom"
import { Product } from "../types"

type Props={products:Product[]}

export default function ProductsGrid({products}:Props){
    return <>
    {products.length > 0 ? (
        // Responsive grid columns
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md group flex flex-col">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-56 sm:h-64 overflow-hidden"> {/* Adjusted height */}
                  {product.image_url?(
                    <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"/>)
                    :(<ImageIcon className="h-56 sm:h-64 text-gray-400" />)}

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white rounded-full p-1 sm:p-1.5 shadow"> {/* Adjusted padding */}
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-[#04515E]" /> {/* Adjusted size and color */}
                  </div>
                </div>
              </Link>
              <div className="p-4 md:p-5 flex flex-col flex-grow"> {/* Adjusted padding */}
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <Link to={`/product/${product.id}`} className="flex-1 mr-2">
                    <h3 className="text-base md:text-lg font-semibold hover:text-[#04515E] line-clamp-2">{product.name}</h3> {/* Adjusted text size and hover color */}
                  </Link>
                  <span className="text-[#04515E] font-bold text-base md:text-lg whitespace-nowrap">{product.price}</span> {/* Adjusted text size and color */}
                </div>
                 <p className="text-xs text-gray-500 mb-1">Kategoria: {product.category}</p> {/* Adjusted text size */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 md:mb-4 flex-grow line-clamp-3">{product.description}</p> {/* Adjusted text size */}
                <Link to={`/product/${product.id}`} className="mt-auto block w-full">
                  <button className="w-full bg-[#04515E] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-xs sm:text-sm"> {/* Adjusted text size and colors */}
                    Zobacz Szczegóły
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
         <div className="text-center py-10 bg-white rounded-lg shadow-sm">
           <p className="text-lg md:text-xl text-gray-600">Nie znaleziono produktów.</p> {/* Adjusted text size */}
         </div>
      )}</>
}
