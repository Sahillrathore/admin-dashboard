import React from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'

const Header = () => {
    return (
        <header className='flex items-center gap-2 py-0 justify-between px-5 pl-2 bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)]'>
            <div className='flex items-center'>
                <div className='logo-section flex items-center'>
                    <img src="/logo-icon.png" alt="" className='w-[67px] h-[67px]' />
                    <img src="/logo.png" alt="" className='h-[50px] w-[163px]' />
                </div>
                <HiMenuAlt3 size={25} className='text-[#457246]' />

                <div className='search-input ml-6 bg-zinc-100 mx-4 rounded-lg px-3 flex gap-2 py-3'>
                    <img src="/search-icon.png" alt="" />
                    <input type="text" placeholder='Search here' className='border-none outline-none text-sm text-[#3A643B]' />
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-6'>
                    <img src="/mail-icon.png" alt="" />
                    <img src="/bell-icon.png" alt="" />
                    <div className='flex gap-2 items-center'>
                        <h4 className='flex flex-col items-end gap-0 text-sm font-bold text-[#457246]'><span>Liam Michael</span> <span className='opacity-50 font-semibold'>Admin</span></h4>
                        <img src="/avatar2.png" className='w-11' alt="" />
                    </div>
                </div>

                <img src="/setting.png" className='w-' alt="" />
            </div>

        </header>
    )
}

export default Header