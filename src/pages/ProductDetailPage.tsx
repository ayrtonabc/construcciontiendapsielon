import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, Palette, Ruler, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { ColorOption } from '../types';

// Define the structure for color options


// Define the 7 color options
const colorOptions: ColorOption[] = [
  { name: "Leśny Mech", hex: "#6a673c", textColor: "text-white" },
  { name: "Pustynny Piasek", hex: "#e4e0d8", textColor: "text-black" },
  { name: "Morski Turkus", hex: "#04515E", textColor: "text-white" },
  { name: "Różany Pocałunek", hex: "#f4a8c4", textColor: "text-black" },
  { name: "Karmelowa Skóra", hex: "#c87d2c", textColor: "text-white" },
  { name: "Nocna Czerń", hex: "#000000", textColor: "text-white" },
  { name: "Słoneczny Żółty", hex: "#FFDA61", textColor: "text-black" }, // Added 7th color
];

// Placeholder product data - Updated PsioTag details
const products = [
  {
    id: "psiotag", // Changed ID to match the new name conceptually
    image: "/img/tags.webp",
    title: "PsioTag", // Updated name
    price: "89.90 zł", // Updated price to 89.90 zł
    description: "Inteligentny tag NFC dla Twojego pupila.",
    longDescription: "PsioTag to nowoczesne rozwiązanie wykorzystujące technologię NFC, aby zapewnić bezpieczeństwo Twojemu zwierzakowi. Przymocuj go do obroży, stwórz profil online i miej pewność, że w razie zaginięcia, znalazca będzie mógł łatwo się z Tobą skontaktować.",
    colors: colorOptions, // Use the new color options
    sizes: ["Jeden Rozmiar"] // Simplified sizes for the tag
  },
  // Keep other products for demonstration, but they won't match the PsioTag details
  { id: "premium-leather", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97", title: "Skóra Premium", price: "219.99 zł", description: "Obroża z prawdziwej skóry o eleganckim designie...", longDescription: "Podkreśl styl swojego zwierzaka...", colors: [{ name: "Brązowy", hex: "#A0522D", textColor: "text-white" }, { name: "Czarny", hex: "#000000", textColor: "text-white" }, { name: "Beżowy", hex: "#F5F5DC", textColor: "text-black" }], sizes: ["S", "M", "L"] },
  { id: "sport-edition", image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd", title: "Edycja Sportowa", price: "179.99 zł", description: "Wodoodporny, wytrzymały design...", longDescription: "Zaprojektowana dla żądnych przygód zwierząt...", colors: [{ name: "Czerwony", hex: "#FF0000", textColor: "text-white" }, { name: "Niebieski", hex: "#0000FF", textColor: "text-white" }, { name: "Zielony", hex: "#008000", textColor: "text-white" }], sizes: ["S", "M", "L", "XL"] }
];

// Define the structure for a product, including the new color options
interface Product {
    id: string;
    image: string;
    title: string;
    price: string;
    description: string;
    longDescription: string;
    colors: ColorOption[];
    sizes: string[];
}


function ProductDetailPage() {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null); // Store the whole color object
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);
  const { productId } = useParams<{ productId: string }>();
  
  
  const fetchData=async(id:string)=>{
    const {data}=await supabase
    .from("products")
    .select()
    .eq("id",id)
    .single<Product>()

    if(data){
      setProduct(products[1])
      const {colors,sizes}=data
      if( colors )setSelectedColor(colorOptions[1])
      if( sizes )setSelectedSize("Jeden Rozmiar")
    }
  } 

  useEffect(() => {
    if(productId)fetchData(productId)
  }, [productId]);

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      // Pass the color name to the cart context
      addToCart({ productId: product.id, title: product.title, price: product.price, color: selectedColor.name, size: selectedSize, image: product.image });
      setAddedMessage(`${product.title} (${selectedColor.name}, ${selectedSize}) dodano do koszyka!`);
      setTimeout(() => setAddedMessage(null), 3000);
    }
  };

  if (!product) {
    return <div className="text-center py-20">Produkt nie znaleziony. <Link to="/shop" className="text-[#04515E] hover:underline">Wróć do sklepu</Link></div>;
  }

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover aspect-square"
            />
             <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-full p-1.5 sm:p-2 shadow">
                <Tag className="h-5 w-5 sm:h-6 sm:w-6 text-[#04515E]" />
             </div>
          </div>

          {/* Product Details & Customization */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">{product.title}</h1>
            <p className="text-xl md:text-2xl text-[#04515E] font-semibold mb-4 md:mb-6">{product.price}</p>
            <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8">{product.longDescription || product.description}</p>

            {/* Color Selection */}
            <div className="mb-6 md:mb-8">
              <label className="block text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-3 flex items-center">
                <Palette className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-600" /> Kolor: <span className="ml-2 font-semibold">{selectedColor?.name}</span>
              </label>
              <div className="flex flex-wrap gap-3"> {/* Increased gap slightly */}
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }} // Apply background color dynamically
                    className={`px-4 py-2 border rounded-md text-xs sm:text-sm transition duration-200 focus:outline-none flex items-center justify-center shadow-sm hover:opacity-90 ${color.textColor} ${/* Use textColor for contrast */''}
                                ${selectedColor?.hex === color.hex
                                  ? `ring-2 ring-offset-1 ring-[#04515E]` // Ring for selected
                                  : 'border-gray-300'}`}
                    title={color.name} // Tooltip for color name
                  >
                    {/* Optional: Add a checkmark or other indicator for selected state */}
                    {/* {selectedColor?.hex === color.hex && <Check className="h-4 w-4 mr-1" />} */}
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && ( // Only show size selection if more than one size exists
              <div className="mb-8 md:mb-10">
                <label className="block text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-3 flex items-center">
                   <Ruler className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-600" /> Rozmiar: <span className="ml-2 font-semibold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border rounded-full text-xs sm:text-sm transition duration-200 focus:outline-none ${''}
                                  ${selectedSize === size
                                    ? 'border-[#04515E] bg-[#e4e0d8] ring-2 ring-[#04515E]'
                                    : 'border-gray-300 hover:border-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
             {/* Display single size if only one exists */}
             {product.sizes.length === 1 && (
                <div className="mb-8 md:mb-10">
                    <p className="text-base md:text-lg text-gray-700 flex items-center">
                        <Ruler className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-600" /> Rozmiar: <span className="ml-2 font-semibold">{product.sizes[0]}</span>
                    </p>
                </div>
             )}


            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className="w-full bg-[#04515E] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 flex items-center justify-center text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Dodaj do koszyka
            </button>
             {/* Added to Cart Message */}
            {addedMessage && (
              <p className="mt-4 text-center text-sm sm:text-base text-green-600 font-medium">{addedMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
