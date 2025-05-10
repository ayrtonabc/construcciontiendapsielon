import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ListFilter, ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import SearchInput from '../components/SearchInput';
import ProductsGrid from '../components/ProductsGrid';
import { Loader } from '../components/Loader';



const categories = ["Wszystkie", "Obroże", "Szelki", "Akcesoria"] as const;

function ShopPage() {


  const [filters, setFilters] = useState<ProductFilters>({category:'Wszystkie',term:""});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading,setIsLoading]=useState(false)
 type ProductFilters={
    category:string,
    term:string

  }
const fetchProducts=async({category,term}:ProductFilters)=>{
  setIsLoading(true)
  let query=supabase.from("products").select("*")
  if(category !== 'Wszystkie'){
    query=query.eq("category",category)
  }
  if(term.trim()!==""){
    query=query.or(`name.ilike.%${term}%,description.ilike.%${term}%`) // Updated to search 'name' instead of 'title'
  }

  const {data,error}=await query
  if(error) throw error
  setFilteredProducts(data)
  setIsLoading(false)
}


  useEffect(()=>{
    fetchProducts(filters)
  },[filters])

/*   React.useEffect(() => {
    if(filteredProducts){
      let productsToShow = filteredProducts;
      if (selectedCategory !== 'Wszystkie') {
        productsToShow = productsToShow.filter(p => p.category === selectedCategory);
      }
      if (searchTerm) {
        console.log(searchTerm,filteredProducts,productsToShow)
        productsToShow = productsToShow.filter(p =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredProducts(productsToShow);
    }

  }, [searchTerm, selectedCategory]); */

  return (
    <div className="py-12 md:py-16 bg-[#f5f2ed]"> {/* Adjusted padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed h1 and p elements */}

        {/* Search and Filter Section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between p-4 md:p-6 bg-white rounded-lg shadow-sm">
          {/* Search Bar */}
          <SearchInput
            placeholder="Szukaj produktów..."
            value={filters.term}
            onChange={(e) => setFilters({...filters,term:e.target.value})}
          />

          {/* Category Filter */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center w-full md:w-auto"> {/* Allow wrapping */}
             <span className="text-sm font-medium text-gray-700 hidden sm:inline mr-2"><ListFilter className="inline h-4 w-4 mr-1"/>Kategorie:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilters({...filters,category})}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm transition duration-200 border mb-1 sm:mb-0 ${/* Adjusted padding/text size */''}
                  ${filters.category === category
                    ? 'bg-[#04515E] text-white border-[#04515E]' /* Updated colors */
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {isLoading? <Loader/> :<ProductsGrid products={filteredProducts}/>}
      </div>
    </div>
  );
}

export default ShopPage;
