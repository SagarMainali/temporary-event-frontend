import React from 'react'
import { Loader2 } from 'lucide-react'

export default function PrimaryLoader() {
    return (
        <div className="flex justify-center items-center h-screen" >
            <Loader2 className="animate-spin text-gray-600" size={40} />
        </div>
    )
}
