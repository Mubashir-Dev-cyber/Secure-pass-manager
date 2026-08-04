import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-white flex flex-col justify-around items-center shrink-0 py-3'>
            <div className="logo font-bold text-white text-2xl">

                <span className='text-green-500'> &lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>

            </div>
            <div className='flex justify-center items-center'>
                <span>Created with </span> <img className='w-6 mx-2 ' src="icons/heart.png" alt="" /> <span> by Mubashir</span>
            </div>
        </footer>
    )
}

export default Footer
