import { LucideLoader2 } from "lucide-react"

export const Loader=()=>(
    <div className="flex justify-center items-center h-64">
          {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> */}
          <LucideLoader2 className="animate-spin"/>
        </div>
)
