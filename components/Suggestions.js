import faker from 'faker'
import { useEffect, useState } from 'react'

function Suggestions() {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestion = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        })
        )
        setSuggestions(suggestion)
    }, [])

    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Sugerencias para ti</h3>
                <button className='text-gray-600 font-semibold'>Ver mas</button>
            </div>
            {suggestions.map((profile) => (
                <div key={profile.id} className='flex items-center justify-between mt-3'>
                    <img className='w-12 h-12 rounded-full border p-[2px]' src={profile.avatar} alt="" />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        <h3 className='text-xs text-gray-400'>{profile.company.name}</h3>
                    </div>
                    <button className='text-blue-400 text-xs font-semibold'>Seguir</button>
                </div>
            ))}
        </div>
    )
}

export default Suggestions
