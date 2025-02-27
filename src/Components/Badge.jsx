import React from 'react'

const Badge = ({ imgUrl, name }) => {
  return (
    <button className='bg-gray-400 flex justify-center items-center gap-1 text-base font-semibold text-white mt-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition-colors shadow-2xl'><img src={imgUrl} className='w-8' />{name}</button>
  )
}

export default Badge