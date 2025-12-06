import React from 'react'
import Sidebar from './Sidebar.tsx'

const Layout = ( {children} ) => {
  return (
    <div className='flex w-full bg-[#F5F5F6] pt-5 min-h-[90vh]'>
        <Sidebar/>
        {children}
    </div>
  )
}

export default Layout