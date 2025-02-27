import React, { useState } from 'react'

const Card = ({ title, description, image, link }) => {

  return (
    <div className="flex flex-col items-center bg-gray-100 border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="w-full h-48 md:h-48 md:w-48 object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <a href={link} className='text-blue-600' target='blank'>View</a>
      </div>
    </div>
  );
}

export default Card
//px-4 py-2 bg-white hover:text-blue-400 rounded-lg text-black font-medium hoverShadow cursor-pointer