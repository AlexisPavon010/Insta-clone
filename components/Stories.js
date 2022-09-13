import { useEffect, useState } from 'react'
import Story from './Story'

function Stories() {

  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    try {

      fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => setSuggestions(data.results));

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {suggestions.map(profile => (
        <Story key={profile.id} img={profile.image} username={profile.name} />
      ))}
    </div>
  )
}

export default Stories
