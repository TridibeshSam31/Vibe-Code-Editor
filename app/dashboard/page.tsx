import React from 'react'
import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-new-repo'




const page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen mx-auto max-w-7xl px-4 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            <AddNewButton/>
            <AddRepo/>
        </div>
    </div>
  )
}

export default page