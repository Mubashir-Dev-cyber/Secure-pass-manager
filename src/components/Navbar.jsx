import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-700 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
          
          <span className='text-green-500'> &lt;</span> 
          <span>Pass</span>
          <span className='text-green-500'>Nest/&gt;</span> 
         
        </div>
        
        <button className="text-white bg-green-500 my-5 rounded-full flex  cursor-pointer justify-between items-center ring-white ring-1">
          <img className='invert p-1 w-10'  src="icons/github.svg" alt="" />
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
