import { Search } from "lucide-react"
import { InputHTMLAttributes } from "react"
import { Prettify } from "../types"

type Props =Prettify<Required<Pick<InputHTMLAttributes<HTMLInputElement>,"value"|"onChange">>&Pick<InputHTMLAttributes<HTMLInputElement>,"className"|"placeholder">>


export default function SearchInput({className="relative flex-grow w-full md:w-1/3 lg:w-1/4",placeholder="Szukaj",value,onChange}:Props){
    return(
        <div className={className}> {/* Adjusted width */}
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={value}
                      onChange={onChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#04515E] focus:border-[#04515E] transition duration-150 text-sm" /* Adjusted text size and focus color */
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> {/* Adjusted size */}
                  </div>
    )
}
